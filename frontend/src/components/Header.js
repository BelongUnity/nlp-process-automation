import React from 'react';
import { Brain, Zap } from 'lucide-react';

const Header = () => {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '20px 0',
      marginBottom: '40px'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '12px 24px',
            borderRadius: '12px',
            color: 'white'
          }}>
            <Brain size={32} />
            <div>
              <h1 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                lineHeight: 1.2
              }}>
                NLP Business Process Automation
              </h1>
              <p style={{
                fontSize: '0.9rem',
                margin: 0,
                opacity: 0.9
              }}>
                Intelligent Text Classification & Workflow Automation
              </p>
            </div>
          </div>
          <Zap size={24} style={{ color: '#667eea' }} />
        </div>
      </div>
    </header>
  );
};

export default Header;