'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function BuilderDashboard() {
  const [currentPage, setCurrentPage] = useState('builderDashboard');
  const [ethosScore, setEthosScore] = useState(420);
  const [ethosVault, setEthosVault] = useState(12500);

  const showPage = (pageId) => setCurrentPage(pageId);

  // Trust pillar data
  const trustPillars = [
    { name: 'Team Transparency', status: 'verified', icon: '✅' },
    { name: 'Liquidity Commitment', status: 'verified', icon: '✅', detail: '180 days locked' },
    { name: 'Treasury Safety', status: 'verified', icon: '✅', detail: 'Gnosis Safe' },
    { name: 'Fair Launch Pledge', status: 'verified', icon: '✅', detail: 'Signed' }
  ];

  return (
    <>
      <canvas id="matrixCanvas" />
      
      <div className="banner">
        🔒 Builder Dashboard • Your Ethoscan Score: {ethosScore}/500
      </div>

      <div className="container">
        {currentPage === 'builderDashboard' && (
          <div className="page active">
            <div className="panel">
              <h2>Builder Dashboard</h2>
              <p>Welcome back, <span style={{ color: '#6ee7b7', fontWeight: '600' }}>Builder</span>!</p>
              
              {/* Dashboard Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                gap: '1.2rem', 
                marginTop: '1.5rem' 
              }}>
                <div style={{ 
                  background: 'rgba(10, 18, 35, 0.7)', 
                  border: '1px solid rgba(13, 148, 136, 0.3)', 
                  borderRadius: '12px', 
                  padding: '1.2rem', 
                  textAlign: 'center' 
                }}>
                  <div>Ethoscan Score</div>
                  <div style={{ 
                    fontSize: '2.2rem', 
                    fontWeight: '800', 
                    background: 'linear-gradient(90deg, #0d9488, #6ee7b7)', 
                    WebkitBackgroundClip: 'text', 
                    backgroundClip: 'text', 
                    color: 'transparent', 
                    margin: '0.5rem 0' 
                  }}>{ethosScore}</div>
                  <div style={{ color: '#34d399' }}>✅ Verified Builder</div>
                </div>
                
                <div style={{ 
                  background: 'rgba(10, 18, 35, 0.7)', 
                  border: '1px solid rgba(13, 148, 136, 0.3)', 
                  borderRadius: '12px', 
                  padding: '1.2rem', 
                  textAlign: 'center' 
                }}>
                  <div>$ETHOS Vault</div>
                  <div style={{ 
                    fontSize: '2.2rem', 
                    fontWeight: '800', 
                    background: 'linear-gradient(90deg, #0d9488, #6ee7b7)', 
                    WebkitBackgroundClip: 'text', 
                    backgroundClip: 'text', 
                    color: 'transparent', 
                    margin: '0.5rem 0' 
                  }}>{ethosVault.toLocaleString()}</div>
                  <button className="btn btn-outline" style={{ 
                    padding: '0.4rem', 
                    fontSize: '0.9rem', 
                    marginTop: '0.5rem' 
                  }}>Buy $ETHOS</button>
                </div>
              </div>

              {/* Trust Pillars */}
              <h3 style={{ marginTop: '1.5rem' }}>Trust Pillars</h3>
              {trustPillars.map((pillar, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  margin: '0.6rem 0',
                  fontSize: '0.95rem',
                  padding: '0.8rem',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px'
                }}>
                  <span style={{ opacity: 0.8 }}>{pillar.name}</span>
                  <span style={{ 
                    color: pillar.status === 'verified' ? '#34d399' : '#f87171',
                    fontWeight: '600'
                  }}>
                    {pillar.icon} {pillar.detail || ''}
                  </span>
                </div>
              ))}

              {/* Improvement Suggestions */}
              <h3 style={{ marginTop: '1.5rem' }}>Suggested Improvement</h3>
              <p style={{ background: 'rgba(13, 148, 136, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                <strong>💡 Boost your score:</strong> Add a third team member via SIWE to increase Team Transparency score by +25 pts.
              </p>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <button className="btn" onClick={() => alert('✅ Wallet connected via WalletConnect!\n(Real integration coming on X1 testnet)')}>
                  Connect Wallet
                </button>
                <button className="btn btn-outline" onClick={() => showPage('loginPage')}>
                  Back to Login
                </button>
              </div>
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
