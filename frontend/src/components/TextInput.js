import React from 'react';
import { Send, Trash2, FileText } from 'lucide-react';

const TextInput = ({ value, onChange, onClassify, onClear, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClassify();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="textInput" className="form-label">
          <FileText size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Business Communication Text
        </label>
        <textarea
          id="textInput"
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter email content, customer message, support ticket, or any business communication text here..."
          rows={6}
          disabled={loading}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          <span>{value.length} characters</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClear}
              disabled={loading || !value.trim()}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              <Trash2 size={16} />
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !value.trim()}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Processing...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Classify & Automate
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextInput;