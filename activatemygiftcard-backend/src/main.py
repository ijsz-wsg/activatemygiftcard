import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, request, make_response
from flask_cors import CORS
from flask_mail import Mail
from src.models.user import db
from src.routes.user import user_bp
from src.routes.activation import activation_bp, init_mail

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

# Initialize Flask-Mail
mail = init_mail(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(activation_bp, url_prefix='/api')

# uncomment if you need to use database
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
with app.app_context():
    db.create_all()

@app.before_request
def before_request():
    """Configure headers to allow social media crawlers"""
    # Allow Facebook, WhatsApp, and other social media crawlers
    user_agent = request.headers.get('User-Agent', '').lower()
    social_crawlers = [
        'facebookexternalhit',
        'whatsapp',
        'twitterbot',
        'telegrambot',
        'linkedinbot',
        'slackbot',
        'discordbot',
        'skypebot'
    ]
    
    # Check if request is from a social media crawler
    if any(crawler in user_agent for crawler in social_crawlers):
        # These requests should be allowed without restrictions
        pass

@app.after_request
def after_request(response):
    """Add headers to improve social media compatibility"""
    # Add cache control headers for social media crawlers
    user_agent = request.headers.get('User-Agent', '').lower()
    social_crawlers = [
        'facebookexternalhit',
        'whatsapp',
        'twitterbot',
        'telegrambot',
        'linkedinbot',
        'slackbot',
        'discordbot',
        'skypebot'
    ]
    
    if any(crawler in user_agent for crawler in social_crawlers):
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
