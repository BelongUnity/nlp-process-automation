"""
Entry point for running the NLP Business Process Automation Engine.
"""

import os
import sys
from app import app

if __name__ == '__main__':
    # Get configuration from environment
    config_name = os.environ.get('FLASK_ENV', 'development')
    
    # Set up environment
    if config_name == 'development':
        app.config['DEBUG'] = True
        app.config['TESTING'] = False
    elif config_name == 'production':
        app.config['DEBUG'] = False
        app.config['TESTING'] = False
    
    # Run the application
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    
    print(f"Starting NLP Business Process Automation Engine...")
    print(f"Environment: {config_name}")
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"Debug: {app.config['DEBUG']}")
    
    app.run(host=host, port=port, debug=app.config['DEBUG'])