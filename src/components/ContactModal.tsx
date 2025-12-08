import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: () => void;
  onRequestInfo: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onGetQuote,
  onRequestInfo,
}) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Yellow/Gold Header - Matching website theme */}
              <div className="bg-yellow-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold text-lg">
                    {t('contactModalHeader')}
                  </span>
                  <Mail className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:bg-yellow-600 rounded-lg p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-8 bg-white">
                {/* Main Question */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('howCanWeHelp')}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {t('helpDescription')}
                </p>

                {/* Buttons - Matching website button style */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      onGetQuote();
                      onClose();
                    }}
                    className="w-full px-6 py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    {t('getQuoteButton')}
                  </button>

                  <button
                    onClick={() => {
                      onRequestInfo();
                      onClose();
                    }}
                    className="w-full px-6 py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    {t('requestOtherInfo')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

