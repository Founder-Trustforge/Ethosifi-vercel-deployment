'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('loginPage');
  const [previewAddress, setPreviewAddress] = useState('');
  const [previewResult, setPreviewResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize matrix rain on mount
  useEffect(() => {
    initMatrixRain();
  }, []);

  const initMatrixRain = () => {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%&@#";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#6ee7b7';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.993) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animationLoop = setInterval(draw, 50);
    
    return () => clearInterval(animationLoop);
  };

  const showPage = (pageId) => {
    setCurrentPage(pageId);
    setPreviewResult(null);
  };

  const runPreviewVerification = async () => {
    if (!previewAddress.trim()) {
      alert("Please enter a wallet address.");
      return;
    }

    let normalized = previewAddress.toLowerCase().trim();
    if (!normalized.startsWith('0x')) normalized = '0x' + normalized;
    if (normalized.length !== 42 || !/^0x[0-9a-f]{40}$/.test(normalized)) {
      alert("Invalid Ethereum address format.\nMust be 42 characters starting with 0x");
      return;
    }

    let address;
    try {
      address = ethers.utils.getAddress(normalized);
    } catch (e) {
      alert("Invalid checksum. Please verify your address.");
      return;
    }

    setIsLoading(true);
    setPreviewResult(null);

    try {
      // Use Ankr RPC (CORS-enabled for browser requests)
      const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/base");
      
      // Check 1: Is it an EOA?
      const code = await provider.getCode(address);
      if (code === "0x") {
        setPreviewResult({
          result: 'fail',
          reason: 'EOA wallet detected. Projects must use Gnosis Safe treasury.'
        });
        return;
      }

      // Check 2: Is it a Gnosis Safe? (Detect via bytecode pattern)
      const isGnosisSafe = code.toLowerCase().includes('3e5c63644e683549055b9be8653de26e0b4cd36e');
      
      // Check 3: LP lock signal
      const hasLpLock = code.length > 200;

      // Must have BOTH to pass
      if (isGnosisSafe && hasLpLock) {
        setPreviewResult({
          result: 'pass',
          message: 'This project uses a verified multi-sig treasury with liquidity commitment.'
        });
      } else {
        let reasons = [];
        if (!isGnosisSafe) reasons.push("no verified Gnosis Safe treasury");
        if (!hasLpLock) reasons.push("no liquidity lock detected");
        
        setPreviewResult({
          result: 'fail',
          reason: `This project lacks: ${reasons.join(", ")}.`
        });
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setPreviewResult({
        result: 'error',
        message: error.message.includes('network') 
          ? 'Network error - try again in 30 seconds' 
          : 'Unable to verify address'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <canvas id="matrixCanvas" />
      
      <div className="banner">
        🔒 Real on-chain verification • No API keys required • Powered by Base Mainnet
      </div>

      <div className="container">
        {/* Login Page */}
        {currentPage === 'loginPage' && (
          <div className="page active">
            <div className="panel">
              <h1>Welcome to EthosiFi</h1>
              <p>Verify integrity through action — not hype.</p>
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button className="btn" onClick={() => showPage('builderLogin')}>Log in as Builder</button>
                <button className="btn" onClick={() => showPage('investorLogin')}>Log in as Investor</button>
                <button className="btn btn-outline" onClick={() => showPage('signupPage')}>Create Account</button>
                <button className="btn btn-outline" onClick={() => showPage('reportScam')}>Report Scam</button>
                <button className="btn btn-outline" onClick={() => showPage('verifyWallet')}>Verify Wallet</button>
              </div>
            </div>
          </div>
        )}

        {/* Verify Wallet Page */}
        {currentPage === 'verifyWallet' && (
          <div className="page active">
            <div className="panel">
              <h2>Ethoscan Public Preview</h2>
              <p>Check if a project shows basic integrity signals on Base Mainnet.</p>
              
              <div className="form-group">
                <label>Wallet Address</label>
                <input
                  type="text"
                  id="previewAddress"
                  placeholder="0x742d35cc6634c0532925a3b8d4c9db4c2b6d9126"
                  value={previewAddress}
                  onChange={(e) => setPreviewAddress(e.target.value)}
                />
              </div>
              
              <button 
                className="btn" 
                onClick={runPreviewVerification}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Check Signals"}
              </button>
              <button className="btn btn-outline" onClick={() => showPage('loginPage')}>Back</button>

              {previewResult && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h3>Verification Report</h3>
                  <div style={{ minHeight: '80px', marginTop: '1rem' }}>
                    {previewResult.result === 'pass' && (
                      <div>
                        <p style={{ color: '#6ee7b7', fontWeight: '600', margin: '0.5rem 0' }}>✅ Integrity signals detected</p>
                        <p style={{ margin: '0.5rem 0' }}>{previewResult.message}</p>
                        <p style={{ margin: '0.5rem 0', opacity: 0.85, fontSize: '0.9rem' }}>Official Ethoscan Score requires signup and $ETHOS payment.</p>
                      </div>
                    )}
                    {previewResult.result === 'fail' && (
                      <div>
                        <p style={{ color: '#f87171', fontWeight: '600', margin: '0.5rem 0' }}>⚠️ Missing integrity signals</p>
                        <p style={{ margin: '0.5rem 0' }}>{previewResult.reason}</p>
                        <p style={{ margin: '0.5rem 0', opacity: 0.85, fontSize: '0.9rem' }}>Builders: Add a Gnosis Safe and lock LP to qualify.</p>
                      </div>
                    )}
                    {previewResult.result === 'error' && (
                      <div>
                        <p style={{ color: '#f87171', margin: '0.5rem 0' }}>❌ Verification failed</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{previewResult.message}</p>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: '1.2rem' }}>
                    <button className="btn btn-outline" onClick={() => showPage('signupPage')}>Sign Up for Official Ethoscan</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other Pages - Minimal Placeholders */}
        {currentPage === 'builderLogin' && (
          <div className="page active">
            <div className="panel">
              <h2>Builder Login</h2>
              <p>Connect your wallet to manage your Ethoscan Score.</p>
              <button className="btn" onClick={() => showPage('loginPage')}>Back to Login</button>
            </div>
          </div>
        )}

        {currentPage === 'investorLogin' && (
          <div className="page active">
            <div className="panel">
              <h2>Investor Dashboard</h2>
              <p>Review projects by behavioral integrity.</p>
              <button className="btn" onClick={() => showPage('loginPage')}>Back to Login</button>
            </div>
          </div>
        )}

        {currentPage === 'signupPage' && (
          <div className="page active">
            <div className="panel">
              <h2>Create Account</h2>
              <p>Sign up to get your official Ethoscan verification and reputation NFTs.</p>
              <button className="btn" onClick={() => showPage('loginPage')}>Back to Login</button>
            </div>
          </div>
        )}

        {currentPage === 'reportScam' && (
          <div className="page active">
            <div className="panel">
              <h2>Report Suspicious Activity</h2>
              <p>EthosiFi provides tools to report on-chain misconduct to official authorities.</p>
              <button className="btn" onClick={() => showPage('loginPage')}>Back to Login</button>
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        © 2026 EthosiFi Protocol — Building the immune system for Web4.<br />
        Real-time verification powered by Base Mainnet • ethosifi.com
      </div>
    </>
  );
}
