import React, { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import ClassificationResult from './components/ClassificationResult';
import ExampleTexts from './components/ExampleTexts';
import { classifyText } from './services/api';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClassify = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to classify');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await classifyText(inputText);
      setResult(response);
    } catch (err) {
      setError(err.message || 'An error occurred during classification');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleText) => {
    setInputText(exampleText);
    setResult(null);
    setError(null);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Text Classification & Automation</h2>
            <p style={{ color: '#6c757d', marginTop: '8px' }}>
              Enter business communication text to automatically classify and get automation steps
            </p>
          </div>
          
          <TextInput
            value={inputText}
            onChange={setInputText}
            onClassify={handleClassify}
            onClear={handleClear}
            loading={loading}
          />
          
          {error && (
            <div className="alert alert-error">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {result && (
            <ClassificationResult result={result} />
          )}
        </div>
        
        <ExampleTexts onExampleClick={handleExampleClick} />
      </div>
    </div>
  );
}

export default App;