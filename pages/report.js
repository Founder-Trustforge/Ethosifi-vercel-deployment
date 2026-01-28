'use client';

import { useState } from 'react';

export default function ReportScam() {
  const [currentPage, setCurrentPage] = useState('reportScam');
  const [formData, setFormData] = useState({
    project: '',
    evidence: '',
    contact: ''
  });

  const showPage = (pageId) => setCurrentPage(pageId);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Report submitted.\n\nNote: EthosiFi does not take enforcement action. We may use this data to update Ethoscan Scores based on on-chain verification.");
    showPage('loginPage');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <canvas id="matrixCanvas" />
      
      <div className="banner">
        ⚠️ EthosiFi does not investigate or punish scams — we provide tools to report verified on-chain misconduct
      </div>

      <div className="container">
        {currentPage === 'reportScam' && (
          <div className="page active">
            <div className="panel">
              <h2>Report Suspicious Activity</h2>
              
              <p style={{ color: '#6ee7b7', fontWeight: '600', marginBottom: '1rem' }}>
                EthosiFi does not investigate or punish scams. We provide tools to help you report verified on-chain misconduct to the appropriate authorities.
              </p>

              <h3 style={{ marginTop: '1.2rem' }}>Step 1: Verify On-Chain Evidence</h3>
              <p>Only report if you have <strong>on-chain proof</strong>, such as:</p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.8rem 0', textAlign: 'left' }}>
                <li>LP unlocked prematurely</li>
                <li>Treasury drained from non-Gnosis wallet</li>
                <li>Fake team impersonation (ENS/SIWE mismatch)</li>
              </ul>

              <h3 style={{ marginTop: '1.2rem' }}>Step 2: Submit to Authorities</h3>
              <p>EthosiFi routes reports to official channels:</p>
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.3)', 
                padding: '1rem', 
                borderRadius: '10px', 
                margin: '1rem 0',
                textAlign: 'left'
              }}>
                <strong>For Ethereum/Base:</strong><br />
                • <a href="https://support.metamask.io/report-scam/" target="_blank" rel="noopener noreferrer" style={{ color: '#6ee7b7' }}>MetaMask Scam Reporting</a><br />
                • <a href="https://chainabuse.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6ee7b7' }}>ChainAbuse (Blockchain Intel)</a>
              </div>

              <h3 style={{ marginTop: '1.2rem' }}>Step 3: Optional — Notify EthosiFi</h3>
              <p>We may use this data to <strong>adjust Ethoscan Scores</strong> (not for enforcement):</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Project Name or Address</label>
                  <input
                    type="text"
                    name="project"
                    placeholder="e.g., 0x... or projectname.eth"
                    value={formData.project}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>On-Chain Evidence (Tx Hash, ENS, etc.)</label>
                  <textarea
                    name="evidence"
                    rows="3"
                    placeholder="Paste transaction hash or verification link"
                    value={formData.evidence}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(13, 148, 136, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div className="form-group">
                  <label>Your Contact (Optional)</label>
                  <input
                    type="email"
                    name="contact"
                    placeholder="you@example.com"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn">Submit for Review</button>
                  <button type="button" className="btn btn-outline" onClick={() => showPage('loginPage')}>
                    Back to Login
                  </button>
                </div>
              </form>
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
