import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

const ExampleTexts = ({ onExampleClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const examples = [
    {
      category: 'Sales Inquiry',
      text: 'Hi, I\'m interested in your premium software package. Could you please send me pricing information and details about the features included? We\'re looking to purchase licenses for our team of 50 people.',
      color: '#1976d2'
    },
    {
      category: 'Customer Support',
      text: 'I\'m having trouble logging into my account. I keep getting an error message that says "Invalid credentials" even though I\'m sure my password is correct. This is urgent as I need to access my data for an important meeting today.',
      color: '#f57c00'
    },
    {
      category: 'Feature Request',
      text: 'I love using your platform, but I think it would be great if you could add a dark mode feature. Many of us work late hours and the bright interface can be hard on the eyes. This would be a fantastic enhancement!',
      color: '#388e3c'
    },
    {
      category: 'Complaint',
      text: 'I\'m extremely disappointed with the service I received. The product I ordered arrived damaged and customer service has been unresponsive to my emails. I want a full refund immediately. This is unacceptable.',
      color: '#d32f2f'
    },
    {
      category: 'General Inquiry',
      text: 'Hello, I was wondering if you could provide more information about your data security practices. How do you ensure that customer information is protected? Also, do you offer any training sessions for new users?',
      color: '#7b1fa2'
    }
  ];

  return (
    <div className="card">
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '16px 0'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Lightbulb size={24} style={{ color: '#ffc107' }} />
          <h3 style={{ margin: 0, color: '#2c3e50' }}>Try Example Texts</h3>
        </div>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </div>
      
      {isExpanded && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            Click on any example below to see how the system classifies different types of business communications:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {examples.map((example, index) => (
              <div
                key={index}
                style={{
                  border: `2px solid ${example.color}20`,
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `${example.color}10`;
                  e.target.style.borderColor = example.color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = `${example.color}20`;
                }}
                onClick={() => onExampleClick(example.text)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: example.color
                  }} />
                  <h4 style={{
                    margin: 0,
                    fontSize: '1rem',
                    color: example.color,
                    fontWeight: '600'
                  }}>
                    {example.category}
                  </h4>
                </div>
                <p style={{
                  margin: 0,
                  color: '#495057',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  fontStyle: 'italic'
                }}>
                  "{example.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleTexts;