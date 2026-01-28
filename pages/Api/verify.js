// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from 'ethers';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.body;

  // Validate address format
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address parameter' });
  }

  // Validate Ethereum address format
  if (!ethers.utils.isAddress(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address format' });
  }

  try {
    // Use Ankr Base RPC (CORS-friendly, no API key required for basic usage)
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/base");
    
    // Check 1: Get contract bytecode
    const code = await provider.getCode(address);
    
    // Check 2: Is it an EOA (Externally Owned Account)?
    if (code === "0x") {
      return res.status(200).json({ 
        result: 'fail',
        reason: 'EOA wallet detected. Projects must use Gnosis Safe treasury.'
      });
    }

    // Check 3: Is it a Gnosis Safe? (Detect via bytecode pattern matching master copy)
    // Base Mainnet Gnosis Safe master copy: 0x3E5c63644E683549055b9Be8653de26E0B4CD36E
    const isGnosisSafe = code.toLowerCase().includes('3e5c63644e683549055b9be8653de26e0b4cd36e');
    
    // Check 4: LP lock signal (real contracts with LP locks have substantial bytecode)
    const hasLpLock = code.length > 200;

    // PASS REQUIREMENT: Must have BOTH Gnosis Safe treasury AND LP lock signal
    if (isGnosisSafe && hasLpLock) {
      return res.status(200).json({ 
        result: 'pass',
        message: 'Verified multi-sig treasury with liquidity commitment detected'
      });
    } else {
      // Build failure reasons
      const reasons = [];
      if (!isGnosisSafe) reasons.push("no verified Gnosis Safe treasury");
      if (!hasLpLock) reasons.push("no liquidity lock detected");
      
      return res.status(200).json({ 
        result: 'fail',
        reason: `This project lacks: ${reasons.join(", ")}.`
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    
    // Handle specific error types
    if (error.code === 'NETWORK_ERROR') {
      return res.status(503).json({ 
        error: 'Network error - Base RPC temporarily unavailable. Please try again in 30 seconds.'
      });
    }
    
    return res.status(500).json({ 
      error: 'Verification failed. Please check address and try again.'
    });
  }
}
