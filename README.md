# NLP-based Business Process Automation Engine

A sophisticated portfolio project that demonstrates the power of Natural Language Processing in automating business processes. This system automatically classifies business communications and provides intelligent workflow automation suggestions.

## 🚀 Features

- **Intelligent Text Classification**: Automatically categorizes business communications into predefined categories
- **Real-time Processing**: Fast, responsive API for instant text analysis
- **Automated Workflow Suggestions**: Provides step-by-step automation recommendations
- **Modern Web Interface**: Clean, responsive React frontend with intuitive UX
- **Confidence Scoring**: Shows classification confidence levels for transparency
- **Multiple Categories**: Supports Sales Inquiries, Customer Support, Feature Requests, Complaints, and General Inquiries

## 🏗️ Architecture

### Backend (Python/Flask)
- **Framework**: Flask with CORS support
- **NLP Engine**: spaCy for advanced text processing
- **Classification**: Custom rule-based classifier with keyword and pattern matching
- **API Endpoints**: RESTful API with health checks and error handling

### Frontend (React)
- **Framework**: React 18 with modern hooks
- **Styling**: Custom CSS with responsive design
- **HTTP Client**: Axios for API communication
- **UI Components**: Modular, reusable components

## 📋 Classification Categories

1. **Sales Inquiry** - Pricing, purchasing, and sales-related communications
2. **Customer Support** - Technical issues, bugs, and support requests
3. **Feature Request** - Enhancement suggestions and improvement requests
4. **Complaint** - Negative feedback and service complaints
5. **General Inquiry** - General questions and information requests

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+ 
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd nlp-process-automation/backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Download spaCy model**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

5. **Run the backend**:
   ```bash
   python run.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd nlp-process-automation/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 🐳 Docker Setup (Alternative)

1. **Build and run with Docker Compose**:
   ```bash
   cd nlp-process-automation
   docker-compose up --build
   ```

This will start both backend and frontend services automatically.

## 📖 API Documentation

### Endpoints

#### `POST /classify`
Classify business communication text and get automation steps.

**Request Body**:
```json
{
  "text": "I'm interested in your premium software package. Could you send pricing information?"
}
```

**Response**:
```json
{
  "category": "sales_inquiry",
  "confidence": 0.85,
  "automation_steps": [
    "Extract contact information from text",
    "Create lead in CRM system",
    "Assign to sales representative",
    "Send automated pricing information",
    "Schedule follow-up call"
  ],
  "message": "Text classified as: Sales Inquiry",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### `GET /categories`
Get available classification categories and descriptions.

#### `GET /health`
Health check endpoint for monitoring.

## 🎯 Usage Examples

### Example 1: Sales Inquiry
**Input**: "Hi, I'm interested in your premium software package. Could you please send me pricing information?"

**Output**: 
- Category: Sales Inquiry
- Confidence: 85%
- Automation: Lead creation, CRM assignment, pricing information delivery

### Example 2: Customer Support
**Input**: "I'm having trouble logging into my account. I keep getting an error message."

**Output**:
- Category: Customer Support  
- Confidence: 90%
- Automation: Support ticket creation, issue extraction, team assignment

### Example 3: Feature Request
**Input**: "It would be great if you could add a dark mode feature to your platform."

**Output**:
- Category: Feature Request
- Confidence: 80%
- Automation: Product backlog logging, requirement extraction, team notification

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_ENV=development
FLASK_DEBUG=true
SECRET_KEY=your-secret-key-here
PORT=5000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:3000
SPACY_MODEL=en_core_web_sm
MIN_CONFIDENCE_THRESHOLD=0.1
MAX_TEXT_LENGTH=10000
LOG_LEVEL=INFO
```

### Customizing Classification

The classification logic can be customized by modifying the `BusinessProcessClassifier` class in `backend/app.py`:

- **Keywords**: Add/remove keywords for each category
- **Patterns**: Add regex patterns for more sophisticated matching
- **Automation Steps**: Customize workflow steps for each category

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📊 Performance Considerations

- **Text Length**: Optimized for texts up to 10,000 characters
- **Response Time**: Average classification time < 100ms
- **Scalability**: Stateless design allows horizontal scaling
- **Memory Usage**: spaCy model requires ~500MB RAM

## 🔒 Security Features

- **Input Validation**: Text length and content validation
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Error Handling**: Comprehensive error handling without information leakage
- **Rate Limiting**: Ready for rate limiting implementation

## 🚀 Deployment

### Production Deployment

1. **Backend**:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Frontend**:
   ```bash
   npm run build
   # Serve build/ directory with nginx or similar
   ```

### Environment-Specific Configuration

- **Development**: Debug mode enabled, detailed logging
- **Production**: Optimized performance, minimal logging
- **Testing**: Isolated test environment with mock data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Learning Outcomes

This project demonstrates:

- **NLP Implementation**: Real-world application of spaCy for text classification
- **API Design**: RESTful API design with proper error handling
- **Frontend Development**: Modern React development with hooks and context
- **Full-Stack Integration**: Seamless communication between frontend and backend
- **Business Logic**: Practical automation workflow design
- **Code Organization**: Clean, modular, and maintainable code structure

## 🔮 Future Enhancements

- **Machine Learning**: Integration with scikit-learn for improved classification
- **Database Integration**: Persistent storage for classification history
- **Real-time Processing**: WebSocket support for real-time updates
- **Multi-language Support**: Support for multiple languages
- **Advanced Analytics**: Classification analytics and reporting
- **Integration APIs**: Connect with popular CRM and support systems

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for demonstrating the power of NLP in business process automation**