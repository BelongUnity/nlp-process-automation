"""
NLP-based Business Process Automation Engine - Backend API
Main Flask application with text classification and automation logic.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import re
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load spaCy model (will download if not present)
try:
    nlp = spacy.load("en_core_web_sm")
    logger.info("spaCy model loaded successfully")
except OSError:
    logger.error("spaCy model 'en_core_web_sm' not found. Please install it with: python -m spacy download en_core_web_sm")
    nlp = None

class BusinessProcessClassifier:
    """
    NLP-based classifier for business process automation.
    Classifies text into predefined business categories.
    """
    
    def __init__(self):
        # Define keywords and patterns for each category
        self.categories = {
            "sales_inquiry": {
                "keywords": ["price", "cost", "buy", "purchase", "quote", "pricing", "order", "sales", "discount", "deal"],
                "patterns": [r"\$[\d,]+", r"how much", r"what.*cost", r"interested.*buy"]
            },
            "customer_support": {
                "keywords": ["help", "problem", "issue", "bug", "error", "support", "trouble", "fix", "broken", "not working"],
                "patterns": [r"can't", r"won't", r"doesn't work", r"help me", r"urgent"]
            },
            "feature_request": {
                "keywords": ["feature", "enhancement", "improvement", "suggestion", "request", "add", "new", "wish", "would like"],
                "patterns": [r"could you", r"would be great", r"please add", r"feature request"]
            },
            "complaint": {
                "keywords": ["complaint", "angry", "frustrated", "disappointed", "terrible", "awful", "hate", "worst", "refund"],
                "patterns": [r"very.*disappointed", r"not happy", r"want.*refund", r"terrible.*service"]
            },
            "general_inquiry": {
                "keywords": ["question", "ask", "wonder", "curious", "information", "details", "explain", "how", "what", "when"],
                "patterns": [r"what is", r"how does", r"can you tell", r"more information"]
            }
        }
    
    def classify_text(self, text):
        """
        Classify input text into business process categories.
        
        Args:
            text (str): Input text to classify
            
        Returns:
            dict: Classification result with category, confidence, and automation steps
        """
        if not text or not text.strip():
            return {
                "category": "invalid_input",
                "confidence": 0.0,
                "automation_steps": ["Request valid input from user"],
                "message": "Please provide valid text input"
            }
        
        # Clean and preprocess text
        cleaned_text = self._preprocess_text(text)
        
        # Calculate scores for each category
        category_scores = {}
        
        for category, config in self.categories.items():
            score = self._calculate_category_score(cleaned_text, config)
            category_scores[category] = score
        
        # Find the category with highest score
        best_category = max(category_scores, key=category_scores.get)
        confidence = category_scores[best_category]
        
        # Get automation steps for the classified category
        automation_steps = self._get_automation_steps(best_category, cleaned_text)
        
        return {
            "category": best_category,
            "confidence": round(confidence, 2),
            "automation_steps": automation_steps,
            "message": f"Text classified as: {best_category.replace('_', ' ').title()}",
            "timestamp": datetime.now().isoformat()
        }
    
    def _preprocess_text(self, text):
        """Clean and preprocess input text."""
        # Convert to lowercase
        text = text.lower()
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def _calculate_category_score(self, text, config):
        """Calculate score for a specific category based on keywords and patterns."""
        score = 0.0
        
        # Check keywords
        for keyword in config["keywords"]:
            if keyword in text:
                score += 1.0
        
        # Check patterns
        for pattern in config["patterns"]:
            matches = len(re.findall(pattern, text, re.IGNORECASE))
            score += matches * 1.5  # Patterns are weighted higher
        
        # Normalize score by text length (to avoid bias towards longer texts)
        text_length = len(text.split())
        if text_length > 0:
            score = score / text_length * 10  # Scale to 0-10 range
        
        return min(score, 10.0)  # Cap at 10
    
    def _get_automation_steps(self, category, text):
        """Get automation steps based on the classified category."""
        automation_workflows = {
            "sales_inquiry": [
                "Extract contact information from text",
                "Create lead in CRM system",
                "Assign to sales representative",
                "Send automated pricing information",
                "Schedule follow-up call"
            ],
            "customer_support": [
                "Create support ticket with priority level",
                "Extract issue details and error messages",
                "Assign to appropriate support team",
                "Send acknowledgment email to customer",
                "Add to support queue for resolution"
            ],
            "feature_request": [
                "Log feature request in product backlog",
                "Extract feature description and requirements",
                "Assign priority based on customer tier",
                "Notify product management team",
                "Send confirmation to requester"
            ],
            "complaint": {
                "high_priority": [
                    "Escalate to customer success manager",
                    "Create high-priority support ticket",
                    "Extract complaint details",
                    "Schedule immediate callback",
                    "Notify management team"
                ],
                "standard": [
                    "Create complaint record",
                    "Assign to customer relations team",
                    "Extract complaint details",
                    "Send acknowledgment with resolution timeline",
                    "Schedule follow-up"
                ]
            },
            "general_inquiry": [
                "Extract question details",
                "Search knowledge base for relevant information",
                "Assign to appropriate department",
                "Send initial response with relevant resources",
                "Schedule follow-up if needed"
            ]
        }
        
        if category == "complaint":
            # Determine if it's high priority based on keywords
            high_priority_keywords = ["urgent", "immediately", "terrible", "awful", "worst", "refund"]
            is_high_priority = any(keyword in text for keyword in high_priority_keywords)
            return automation_workflows[category]["high_priority" if is_high_priority else "standard"]
        
        return automation_workflows.get(category, ["Manual review required"])

# Initialize classifier
classifier = BusinessProcessClassifier()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "spacy_model_loaded": nlp is not None
    })

@app.route('/classify', methods=['POST'])
def classify_text():
    """
    Main endpoint for text classification and automation.
    
    Expected JSON payload:
    {
        "text": "Customer message or email content"
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                "error": "Missing 'text' field in request body"
            }), 400
        
        text = data['text']
        logger.info(f"Classifying text: {text[:100]}...")
        
        # Classify the text
        result = classifier.classify_text(text)
        
        logger.info(f"Classification result: {result['category']} (confidence: {result['confidence']})")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in classification: {str(e)}")
        return jsonify({
            "error": "Internal server error during classification",
            "message": str(e)
        }), 500

@app.route('/categories', methods=['GET'])
def get_categories():
    """Get available classification categories."""
    return jsonify({
        "categories": list(classifier.categories.keys()),
        "descriptions": {
            "sales_inquiry": "Customer inquiries about pricing, purchasing, or sales",
            "customer_support": "Technical issues, bugs, or support requests",
            "feature_request": "Requests for new features or improvements",
            "complaint": "Customer complaints or negative feedback",
            "general_inquiry": "General questions or information requests"
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)