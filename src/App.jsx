import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Mail } from 'lucide-react';
import GiftCardCarousel from './components/GiftCardCarousel';
import ActivationForm from './components/ActivationForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCard, setSelectedCard] = useState(null);
  const [language, setLanguage] = useState('fr');

  // Détection automatique de la langue
  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'en') {
      setLanguage('en');
    }
  }, []);

  const texts = {
    fr: {
      nav: {
        home: "Accueil",
        language: "English"
      },
      hero: {
        title: "Activez votre carte cadeau en toute sécurité",
        subtitle: "Remplissez le formulaire, notre équipe active votre carte et vous renvoie un message",
        cta: "Choisir ma carte"
      },
      features: {
        title: "Pourquoi nous choisir ?",
        security: {
          title: "Sécurité garantie",
          description: "Vos données sont protégées par un cryptage de niveau bancaire"
        },
        speed: {
          title: "Activation rapide",
          description: "Notre équipe traite votre demande sous 24h maximum"
        },
        support: {
          title: "Support dédié",
          description: "Une équipe d'experts à votre disposition pour vous accompagner"
        }
      },
      footer: {
        contact: "Contact Service Client",
        privacy: "Politique de confidentialité",
        terms: "Mentions légales",
        copyright: "© 2024 ActivateMyGiftCard. Tous droits réservés."
      }
    },
    en: {
      nav: {
        home: "Home",
        language: "Français"
      },
      hero: {
        title: "Activate your gift card securely",
        subtitle: "Fill out the form, our team activates your card and sends you a message",
        cta: "Choose my card"
      },
      features: {
        title: "Why choose us?",
        security: {
          title: "Guaranteed security",
          description: "Your data is protected by bank-level encryption"
        },
        speed: {
          title: "Fast activation",
          description: "Our team processes your request within 24 hours maximum"
        },
        support: {
          title: "Dedicated support",
          description: "A team of experts at your disposal to accompany you"
        }
      },
      footer: {
        contact: "Customer Service Contact",
        privacy: "Privacy Policy",
        terms: "Legal Notice",
        copyright: "© 2024 ActivateMyGiftCard. All rights reserved."
      }
    }
  };

  const t = texts[language] || texts.fr;

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setCurrentView('form');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCard(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const scrollToCards = () => {
    const cardsSection = document.getElementById('cards-section');
    cardsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView === 'form') {
    return (
      <ActivationForm
        selectedCard={selectedCard}
        onBack={handleBackToHome}
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-xl font-bold text-gray-800">ActivateMyGiftCard</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Globe className="w-4 h-4 mr-1" />
              {t.nav.language}
            </button>
            <a
              href="mailto:activatemygiftcaard@gmail.com"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
            <button
              onClick={scrollToCards}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.features.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t.features.security.title}
              </h3>
              <p className="text-gray-600">
                {t.features.security.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t.features.speed.title}
              </h3>
              <p className="text-gray-600">
                {t.features.speed.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t.features.support.title}
              </h3>
              <p className="text-gray-600">
                {t.features.support.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="cards-section">
        <GiftCardCarousel onCardSelect={handleCardSelect} language={language} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-blue-400 mr-3" />
                <span className="text-xl font-bold">ActivateMyGiftCard</span>
              </div>
              <p className="text-gray-400 mb-4">
                Service sécurisé d'activation de cartes cadeaux en ligne.
              </p>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-2" />
                <a
                  href="mailto:activatemygiftcaard@gmail.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  activatemygiftcaard@gmail.com
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
              <a
                href="mailto:activatemygiftcaard@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                activatemygiftcaard@gmail.com
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t.footer.privacy}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t.footer.terms}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

