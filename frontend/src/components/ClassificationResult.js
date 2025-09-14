import React from 'react';
import { CheckCircle, Clock, TrendingUp, AlertTriangle, MessageSquare, HelpCircle } from 'lucide-react';

const ClassificationResult = ({ result }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      sales_inquiry: <TrendingUp size={20} />,
      customer_support: <HelpCircle size={20} />,
      feature_request: <CheckCircle size={20} />,
      complaint: <AlertTriangle size={20} />,
      general_inquiry: <MessageSquare size={20} />
    };
    return icons[category] || <MessageSquare size={20} />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      sales_inquiry: '#1976d2',
      customer_support: '#f57c00',
      feature_request: '#388e3c',
      complaint: '#d32f2f',
      general_inquiry: '#7b1fa2'
    };
    return colors[category] || '#6c757d';
  };

  const formatCategoryName = (category) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return '#28a745';
    if (confidence >= 0.6) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${getCategoryColor(result.category)}20, ${getCategoryColor(result.category)}40)`,
            color: getCategoryColor(result.category)
          }}>
            {getCategoryIcon(result.category)}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#2c3e50' }}>
              {formatCategoryName(result.category)}
            </h3>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
              {result.message}
            </p>
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <Clock size={16} style={{ color: '#6c757d' }} />
            <span style={{ fontSize: '0.8rem', color: '#6c757d' }}>
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>Confidence:</span>
              <span style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: getConfidenceColor(result.confidence)
              }}>
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{
                  width: `${result.confidence * 100}%`,
                  background: `linear-gradient(90deg, ${getConfidenceColor(result.confidence)}, ${getConfidenceColor(result.confidence)}80)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="automation-steps">
        <h4 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <CheckCircle size={20} style={{ color: '#28a745' }} />
          Automated Workflow Steps
        </h4>
        <ul className="step-list">
          {result.automation_steps.map((step, index) => (
            <li key={index} className="step-item">
              <div className="step-number">{index + 1}</div>
              <div className="step-text">{step}</div>
            </li>
          ))}
        </ul>
      </div>

      {result.confidence < 0.5 && (
        <div className="alert alert-info" style={{ marginTop: '20px' }}>
          <strong>Low Confidence:</strong> This classification has low confidence. 
          Consider manual review or providing more context in the input text.
        </div>
      )}
    </div>
  );
};

export default ClassificationResult;