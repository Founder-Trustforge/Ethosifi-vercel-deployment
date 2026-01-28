'use client';

import { useState } from 'react';

export default function InvestorDashboard() {
  const [currentPage, setCurrentPage] = useState('investorDashboard');

  const showPage = (pageId) => setCurrentPage(pageId);

  // Sample projects data
  const projects = [
    {
      name: 'EthosiFi Protocol',
      score: 420,
      tier: '✅ Verified Builder',
      pillars: [
        { name: 'Team Transparency', status: 'verified' },
        { name: 'LP Locked', status: 'verified', detail: '180 days' },
        { name: 'Treasury', status: 'verified', detail: 'Gnosis Safe' }
      ]
    },
    {
      name: 'DeFiShield',
      score: 380,
      tier: '✅ Verified Builder',
      pillars: [
        { name: 'Team Transparency', status: 'verified' },
        { name: 'LP Locked', status: 'verified', detail: '365 days' },
        { name: 'Treasury', status: 'unverified', detail: '⚠️ Not verified' }
      ]
    },
    {
      name: 'MoonRocket v2',
      score: 120,
      tier: '⚠️ Unverified',
      pillars: [
        { name: 'Team Transparency', status: 'unverified', detail: '⚠️ Anonymous' },
        { name: 'LP Locked', status: 'unverified', detail: '❌ None' },
        { name: 'Treasury', status: 'unverified', detail: '⚠️ Unknown' }
      ]
    }
  ];

  return (
    <>
      <canvas id="matrixCanvas" />
      
      <div className="banner">
        🔍 Investor Dashboard • Review projects by behavioral integrity
      </div>

      <div className="container">
        {currentPage === 'investorDashboard' && (
          <div className="page active">
            <div className="panel">
              <h2>Investor Dashboard</h2>
              <p>Review projects by behavioral integrity before investing:</p>
              
              {projects.map((project, index) => (
                <div key={index} style={{ 
                  background: 'rgba(10, 18, 35, 0.7)', 
                  border: '1px solid rgba(13, 148, 136, 0.3)', 
                  borderRadius: '12px', 
                  padding: '1.5rem', 
                  marginBottom: '1.2rem' 
                }}>
                  <strong style={{ fontSize: '1.1rem' }}>{project.name}</strong><br />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    margin: '0.6rem 0', 
                    alignItems: 'center' 
                  }}>
                    <span>Score: <span style={{ color: '#6ee7b7', fontWeight: 'bold' }}>{project.score}</span></span>
                    <span style={{ fontWeight: '600' }}>{project.tier}</span>
                  </div>
                  
                  {project.pillars.map((pillar, pIndex) => (
                    <div key={pIndex} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      margin: '0.5rem 0', 
                      fontSize: '0.9rem',
                      paddingLeft: '1rem'
                    }}>
                      <span style={{ opacity: 0.8 }}>{pillar.name}</span>
                      <span style={{ 
                        color: pillar.status === 'verified' ? '#34d399' : '#f87171',
                        fontWeight: '600'
                      }}>
                        {pillar.status === 'verified' ? '✅' : '⚠️'} {pillar.detail || ''}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              
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
