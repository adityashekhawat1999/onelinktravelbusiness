import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'pt', label: 'Português (PT)' },
    { code: 'en', label: 'English (EN)' }
  ];

  const currentLanguageLabel = languages.find(lang => lang.code === language)?.label || 'Language';

  return (
    <div className="fixed top-24 right-4 z-[100] md:top-28 md:right-6 pointer-events-auto" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] hover:border-slate-300 text-slate-700 px-4 py-2.5 rounded-full transition-all duration-300 group"
        >
          <Globe className="w-4 h-4 text-[#7195e0] group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold text-sm hidden sm:block">{currentLanguageLabel}</span>
          <span className="font-semibold text-sm sm:hidden uppercase">{language}</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-50"
            >
              <div className="p-2 flex flex-col space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (language !== lang.code) toggleLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                      language === lang.code
                        ? 'bg-[#f4f7fc] text-[#7195e0]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="flex-grow">{lang.label}</span>
                    {language === lang.code && (
                      <div className="w-2 h-2 rounded-full bg-[#7195e0]"></div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageSelector;
