import React from 'react';
import { motion } from 'framer-motion';

// Import des logos
import transcashLogo from '../assets/transcash-logo.png';
import neosurfLogo from '../assets/neosurf-logo.jpg';
import pcsLogo from '../assets/pcs-logo.jpg';
import googlePlayLogo from '../assets/googleplay-logo.jpg';
import paysafecardLogo from '../assets/paysafecard-logo.png';
import steamLogo from '../assets/steam-logo.png';
import cashlibLogo from '../assets/cashlib-logo.webp';
import itunesLogo from '../assets/itunes-logo.png';
import bitcoincashLogo from '../assets/bitcoincash-logo.png';

const giftCards = [
  { id: 'transcash', name: 'Transcash', logo: transcashLogo },
  { id: 'neosurf', name: 'Neosurf', logo: neosurfLogo },
  { id: 'pcs', name: 'PCS', logo: pcsLogo },
  { id: 'googleplay', name: 'Google Play', logo: googlePlayLogo },
  { id: 'paysafecard', name: 'Paysafecard', logo: paysafecardLogo },
  { id: 'steam', name: 'Steam', logo: steamLogo },
  { id: 'cashlib', name: 'Cashlib', logo: cashlibLogo },
  { id: 'itunes', name: 'iTunes', logo: itunesLogo },
  { id: 'bitcoincash', name: 'BitcoinCash', logo: bitcoincashLogo },
];

const GiftCardCarousel = ({ onCardSelect, language }) => {
  const texts = {
    fr: {
      title: "Cartes compatibles",
      subtitle: "Cliquez sur le logo de votre carte pour l'activer"
    },
    en: {
      title: "Compatible Cards",
      subtitle: "Click on your card logo to activate it"
    }
  };

  const t = texts[language] || texts.fr;

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6 max-w-6xl mx-auto">
          {giftCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => onCardSelect(card)}
            >
              <div className="aspect-square flex items-center justify-center">
                <img
                  src={card.logo}
                  alt={card.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 text-center mt-2">
                {card.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftCardCarousel;

