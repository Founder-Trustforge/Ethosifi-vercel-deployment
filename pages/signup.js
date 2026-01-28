'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [currentPage, setCurrentPage] = useState('signupPage');
  const [formData, setFormData] = useState({
    email: '',
    role: 'Builder'
  });

  const showPage = (pageId) => setCurrentPage(pageId);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: send to backend, create account, etc.
    alert("✅ Account created successfully!\n\nYou'll receive an email with next steps to complete your Ethoscan verification.");
    showPage('loginPage');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <canvas id="matrixCanvas" />
      
      <div className="banner">
        🚀 Create your EthosiFi account • Get verified • Build trust
      </div>

      <div className="container">
        {currentPage === 'signupPage' && (
          <div className="page active">
            <div className="panel">
              <h2>Create Your Account</h2>
              <p>Sign up to get your official Ethoscan verification and reputation NFTs.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@project.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(13, 148, 136, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontFamily: 'inherit',
                      fontSize: '1rem'
                    }}
                  >
                    <option>Builder</option>
                    <option>Investor</option>
                  </select>
                </div>
                
                <div style={{ marginTop: '1.5rem' }}>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem', textAlign: 'left' }}>
                    By signing up, you agree to EthosiFi's <a href="#" style={{ color: '#6ee7b7' }}>Terms of Service</a> and <a href="#" style={{ color: '#6ee7b7' }}>Privacy Policy</a>.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <button type="submit" className="btn">Create Account</button>
                    <button type="button" className="btn btn-outline" onClick={() => showPage('loginPage')}>
                      Back to Login
                    </button>
                  </div>
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
