import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ArrowLeft,
  RotateCw,
  MessageCircle,
  Compass,
  ServerCrash,
  ShieldAlert,
  Clock,
  ArrowUpRight,
  Plane,
  GraduationCap,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ERROR_CONFIGS = {
  404: {
    icon: Compass,
    accentColor: '#7195e0',
    accentBg: 'rgba(113, 149, 224, 0.1)',
    accentBorder: 'rgba(113, 149, 224, 0.3)',
    glowClass: 'from-[#7195e0]/20 via-[#a5c2ff]/10 to-transparent',
    translationKey: 'notFound',
    showBrandLinks: true,
  },
  500: {
    icon: ServerCrash,
    accentColor: '#ef4444',
    accentBg: 'rgba(239, 68, 68, 0.08)',
    accentBorder: 'rgba(239, 68, 68, 0.25)',
    glowClass: 'from-rose-500/20 via-orange-500/10 to-transparent',
    translationKey: 'serverError',
    showReload: true,
    showBrandLinks: true,
  },
  403: {
    icon: ShieldAlert,
    accentColor: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.08)',
    accentBorder: 'rgba(245, 158, 11, 0.25)',
    glowClass: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    translationKey: 'forbidden',
    showBrandLinks: true,
  },
  503: {
    icon: Clock,
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139, 92, 246, 0.08)',
    accentBorder: 'rgba(139, 92, 246, 0.25)',
    glowClass: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    translationKey: 'serviceUnavailable',
    showReload: true,
    showBrandLinks: false,
  }
};

const ErrorLayout = ({
  code = 404,
  error = null,
  errorInfo = null,
  onReset = null,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = ERROR_CONFIGS[code] || ERROR_CONFIGS[404];
  const IconComponent = config.icon;
  const translationKey = config.translationKey;

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleReload = () => {
    if (onReset) {
      onReset();
    }
    window.location.reload();
  };

  const handleCopyError = () => {
    const errorDetails = `[One Link Holding Error Report]
Code: ${code}
Time: ${new Date().toISOString()}
URL: ${typeof window !== 'undefined' ? window.location.href : ''}
Error: ${error?.toString() || 'N/A'}
Stack: ${error?.stack || 'N/A'}
Component Stack: ${errorInfo?.componentStack || 'N/A'}`;

    navigator.clipboard.writeText(errorDetails).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const brandLinks = [
    {
      to: '/',
      title: t('errors.common.homeTitle'),
      desc: t('errors.common.homeDesc'),
      icon: Home,
      color: 'hover:border-[#7195e0]/50 hover:bg-[#7195e0]/5',
      badge: 'Group'
    },
    {
      to: '/onelinktravel',
      title: t('errors.common.travelTitle'),
      desc: t('errors.common.travelDesc'),
      icon: Plane,
      color: 'hover:border-[#7195e0]/50 hover:bg-[#7195e0]/5',
      badge: 'Travel'
    },
    {
      to: '/cbest',
      title: t('errors.common.cbestTitle'),
      desc: t('errors.common.cbestDesc'),
      icon: GraduationCap,
      color: 'hover:border-[#e89cae]/50 hover:bg-[#e89cae]/5',
      badge: 'Education'
    },
    {
      to: '/#faqs',
      title: t('errors.common.faqsTitle'),
      desc: t('errors.common.faqsDesc'),
      icon: HelpCircle,
      color: 'hover:border-slate-300 hover:bg-slate-50',
      badge: 'Support'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
      {/* Decorative ambient background elements */}
      <div 
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br ${config.glowClass} blur-3xl pointer-events-none opacity-70`} 
      />
      <div 
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-gradient-to-bl from-[#7195e0]/15 via-rose-300/10 to-transparent blur-3xl pointer-events-none opacity-60" 
      />
      <div 
        className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-[#7195e0]/10 to-transparent blur-2xl pointer-events-none" 
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Floating status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 border shadow-xs"
          style={{
            backgroundColor: config.accentBg,
            borderColor: config.accentBorder,
            color: config.accentColor
          }}
          role="status"
        >
          <span className="relative flex h-2 w-2">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: config.accentColor }}
            />
            <span 
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: config.accentColor }}
            />
          </span>
          <IconComponent className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t(`errors.${translationKey}.badge`)}</span>
        </motion.div>

        {/* Big Stylized Error Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          className="relative select-none my-2"
        >
          <div 
            className="text-8xl sm:text-9xl md:text-[11rem] font-extrabold font-manrope tracking-tighter leading-none bg-gradient-to-br from-slate-900 via-slate-800 to-[#7195e0] bg-clip-text text-transparent drop-shadow-sm"
          >
            {code}
          </div>
          <div 
            className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-30 pointer-events-none" 
          />
        </motion.div>

        {/* Headline & Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-2 mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-manrope text-slate-900 tracking-tight mb-3">
            {t(`errors.${translationKey}.title`)}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-worksans">
            {t(`errors.${translationKey}.subtitle`)}
          </p>
          {t(`errors.${translationKey}.hint`) && (
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {t(`errors.${translationKey}.hint`)}
            </p>
          )}
        </motion.div>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 w-full max-w-lg"
        >
          {config.showReload ? (
            <button
              onClick={handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-[#7195e0] hover:bg-[#5a7bc2] shadow-lg shadow-[#7195e0]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              aria-label={t(`errors.${translationKey}.reload`)}
            >
              <RotateCw className="w-4 h-4" />
              <span>{t(`errors.${translationKey}.reload`)}</span>
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-[#7195e0] hover:bg-[#5a7bc2] shadow-lg shadow-[#7195e0]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              aria-label={t('errors.common.goHome')}
            >
              <Home className="w-4 h-4" />
              <span>{t('errors.common.goHome')}</span>
            </Link>
          )}

          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            aria-label={t('errors.common.goBack')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('errors.common.goBack')}</span>
          </button>

          <a
            href="https://wa.me/244922475109"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/80 hover:border-emerald-300 shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            aria-label={t('errors.common.whatsappSupport')}
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{t('errors.common.whatsappSupport')}</span>
          </a>
        </motion.div>

        {/* Collapsible Technical Details for 500 or ErrorBoundary errors */}
        {(error || errorInfo) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="w-full max-w-2xl text-left mb-12 bg-white rounded-2xl border border-rose-200/70 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4 bg-rose-50/50 hover:bg-rose-50 text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
              aria-expanded={showDetails}
            >
              <span className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-4 h-4" />
                {t('errors.serverError.detailsTitle')}
              </span>
              <span className="text-slate-500 flex items-center gap-1 text-xs">
                {showDetails ? (
                  <>
                    <span>Hide</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Show</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 border-t border-rose-100 bg-slate-900 text-slate-200 text-xs font-mono overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800">
                    <span className="text-slate-400">
                      {t('errors.serverError.detailsSubtitle')}
                    </span>
                    <button
                      onClick={handleCopyError}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{t('errors.serverError.copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t('errors.serverError.copyError')}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2 text-rose-300">
                    {error && (
                      <p className="font-semibold text-rose-400">
                        {error.toString()}
                      </p>
                    )}
                    {error?.stack && (
                      <pre className="text-[11px] text-slate-400 whitespace-pre-wrap font-mono">
                        {error.stack}
                      </pre>
                    )}
                    {errorInfo?.componentStack && (
                      <div className="pt-2 border-t border-slate-800">
                        <span className="text-slate-500">Component Stack:</span>
                        <pre className="text-[11px] text-slate-400 whitespace-pre-wrap font-mono">
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Brand quick-jump cards (for 404, 403, 500) */}
        {config.showBrandLinks && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-3xl"
          >
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4 font-manrope">
              {t('errors.common.helpfulLinks')}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
              {brandLinks.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group relative p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-start gap-3.5 ${item.color}`}
                  >
                    <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-white text-slate-700 group-hover:text-[#7195e0] transition-colors shrink-0">
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold font-manrope text-slate-900 group-hover:text-[#7195e0] transition-colors truncate">
                          {item.title}
                        </h2>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#7195e0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-worksans">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ErrorLayout;
