import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, CheckCircle2, ArrowRight, Leaf, Sprout, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FloatingParticles from '../components/effects/FloatingParticles';
import T from '../components/T';

const LanguageSelect = () => {
  const { LANGUAGES, selectLanguage, language: currentLang, t } = useLanguage();
  const [selected, setSelected] = useState(currentLang);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    lang.region.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    selectLanguage(selected);
    navigate('/');
  };

  const selectedLang = LANGUAGES.find(l => l.code === selected);

  return (
    <div className="bg-brand-cream min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      <div className="noise-overlay" />

      {/* Animated background dots — matching Home page */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.12)',
            left:  `${[10, 25, 45, 60, 75, 90][i]}%`,
            top:   `${[15, 35, 20, 50, 40, 65][i]}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}


      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center shadow-2xl">
              <Languages className="text-brand-gold" size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-3 tracking-tight">
            {t('selectLanguage')}
          </h1>
          <p className="text-brand-olive text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            {t('selectSubtitle')}
          </p>
          <p className="text-brand-olive/40 text-sm mt-2 font-black uppercase tracking-widest">
            Choose Language • เลือกภาษา • भाषा चुनें • ภาษา
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card !p-0 overflow-hidden !rounded-[2.5rem] shadow-2xl border-white/40"
        >
          <div className="p-6 border-b border-brand-olive/5">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-olive/40" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-5 py-4 rounded-2xl bg-brand-cream/50 border border-brand-olive/10 text-brand-dark placeholder:text-brand-olive/30 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green/30 transition-all"
              />
            </div>
          </div>

          {/* Language grid */}
          <div className="p-5 max-h-[420px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#16a34a transparent' }}>
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-green-200/50 font-medium">
                No language found
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <AnimatePresence>
                  {filtered.map((lang, idx) => {
                    const isSelected = selected === lang.code;
                    return (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: idx * 0.02 }}
                        onClick={() => setSelected(lang.code)}
                        className={`relative p-5 rounded-2xl text-left transition-all duration-300 group border-2 ${isSelected ? 'bg-brand-green text-white border-brand-green shadow-xl shadow-brand-green/20' : 'bg-white/40 border-brand-olive/5 text-brand-dark hover:border-brand-green/30'}`}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 text-brand-gold"
                          >
                            <CheckCircle2 size={18} fill="currentColor" />
                          </motion.div>
                        )}
                        <div className={`mb-3 w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black shadow-lg transition-transform group-hover:rotate-12 ${isSelected ? 'bg-white text-brand-green' : 'bg-brand-green/10 text-brand-green'}`}>
                          {lang.code === 'en' ? 'EN' : 'IN'}
                        </div>
                        <div className={`font-black text-base leading-tight ${isSelected ? 'text-white' : 'text-brand-dark'}`}>{lang.nativeName}</div>
                        <div className={`text-sm mt-1 font-medium ${isSelected ? 'text-white/70' : 'text-brand-olive'}`}>{lang.name}</div>
                        <div className={`text-[10px] mt-2 font-bold uppercase tracking-widest ${isSelected ? 'text-white/40' : 'text-brand-olive/30'}`}>{lang.region}</div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer / Continue Button */}
          <div className="p-6 bg-brand-cream/30 border-t border-brand-olive/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-xs font-black text-brand-green shadow-inner">
                {selectedLang?.code === 'en' ? 'EN' : 'IN'}
              </div>
              <div>
                <div className="text-brand-dark font-black text-base">{selectedLang?.nativeName}</div>
                <div className="text-brand-olive text-xs font-bold uppercase tracking-tight">{selectedLang?.name} • {selectedLang?.region}</div>
              </div>
            </div>
            <motion.button
              onClick={handleContinue}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary flex items-center gap-2 group !px-8"
            >
              <T>{t('continueBtn')}</T>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>

        {/* Branding footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 flex items-center justify-center gap-3 text-brand-olive/40 text-sm"
        >
          <Leaf size={16} />
          <span className="font-black uppercase tracking-[0.2em]">Agro<span className="italic text-brand-green">XAI</span></span>
          <span className="opacity-50">|</span>
          <span className="font-bold">PRECISION AI</span>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelect;
