import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight,
  CheckCircle2,
  Plus,
  Minus,
  ArrowUpRight,
  MessageCircle,
  Briefcase,
  Globe,
  Shield,
  Plane,
  GraduationCap,
  ChevronRight,
  Phone,
  Mail,
  Users,
  CheckCircle,
  Activity,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const heroBg = 'https://videos.pexels.com/video-files/3121459/3121459-uhd_2560_1440_24fps.mp4';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className={`mb-4 bg-white border ${isOpen ? 'border-[#7195e0]/40 shadow-[0_8px_30px_-12px_rgba(113,149,224,0.15)]' : 'border-slate-200/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)]'} rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_-12px_rgba(113,149,224,0.15)] hover:border-[#7195e0]/40 transition-all duration-300 relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Subtle indicator bar on the left when open */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#7195e0] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group focus:outline-none px-6 py-6 md:px-8 md:py-7"
      >
        <h4 className={`text-lg md:text-xl font-semibold font-manrope transition-colors pr-6 ${isOpen ? 'text-[#7195e0]' : 'text-slate-900 group-hover:text-[#7195e0]'}`}>
          {question}
        </h4>
        <motion.div 
          animate={{ backgroundColor: isOpen ? "rgba(113, 149, 224, 0.1)" : "transparent", borderColor: isOpen ? "transparent" : "#e2e8f0" }}
          className="flex-shrink-0 w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-colors duration-300 text-slate-500 group-hover:text-[#7195e0] group-hover:border-[#7195e0]"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? <Minus className="w-5 h-5 text-[#7195e0]" /> : <Plus className="w-5 h-5" />}
          </motion.div>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <div className="h-px w-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 mb-6"></div>
              <p className="text-slate-600 font-light text-base md:text-lg leading-relaxed pr-12">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AnimatedCounter = ({ value, label, prefix = "", suffix = "+", color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (val) => setDisplayValue(Math.round(val)),
      });
      return controls.stop;
    }
  }, [isInView, numericValue]);

  return (
    <motion.div 
      ref={ref}
      className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white/60 p-6 shadow-xl text-center relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ y: -5 }}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${color}`}></div>
      <motion.div 
        className={`text-4xl md:text-5xl font-extrabold font-manrope mb-1 bg-gradient-to-br ${color} bg-clip-text text-transparent`}
      >
        {prefix}{displayValue}{suffix}
      </motion.div>
      <div className="text-slate-600 font-medium text-sm relative z-10">{label}</div>
    </motion.div>
  );
};

const InlineCounter = ({ value, prefix = "", suffix = "+" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 2.0,
        ease: "easeOut",
        onUpdate: (val) => setDisplayValue(Math.round(val)),
      });
      return controls.stop;
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const globalPartners = [
  { name: "Kent State University", img: "/ourPartnerimages/Kent_State_University_Logo.svg.webp" },
  { name: "C3S Business School", img: "/ourPartnerimages/c3s-business-school-logo.png" },
  { name: "Parul University", img: "/ourPartnerimages/parul-university.jpg" },
  { name: "Jain University", img: "/ourPartnerimages/jain-university-logo.png" },
  { name: "Orel State University", img: "/ourPartnerimages/orelstateuniversity.jpeg" },
  { name: "EU Helpers", img: "/ourPartnerimages/euhelpers.jpg" },
  { name: "Perfect Immigration", img: "/ourPartnerimages/perfect_immigration.webp" },
  { name: "Prepara Portugal", img: "/ourPartnerimages/prepara_portugal.png" },
  { name: "Romania University", img: "/ourPartnerimages/romania_university.jpeg" },
  { name: "Xian University", img: "/ourPartnerimages/xian_university.png" }
];

const clientAvatars = [
  "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop"
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="pt-20 bg-slate-50 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900">
        {/* Video Background for Hero */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-100 object-center"
          >
            <source src={heroBg} type="video/mp4" />
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Video Overlay - Removed white overlay to make video completely clear */}
        <div className="absolute inset-0 z-0 pointer-events-none"></div>
        
        <motion.div 
          className="absolute top-20 -left-20 w-96 h-96 bg-[#f8c1cc]/30 rounded-full blur-3xl z-0 pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-[#7195e0]/20 rounded-full blur-3xl z-0 pointer-events-none"
          animate={{ x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-manrope text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl"
          >
            {t('home.heroTitle1')} <br /> 
            <span className="text-[#a5c2ff] drop-shadow-md">{t('home.heroTitle2')}</span> <br /> 
            {t('home.heroTitle3')}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-100 font-worksans leading-relaxed font-medium drop-shadow-xl"
          >
            {t('home.heroDesc')} <span className="font-bold text-white">One Link Travel</span> {t('home.heroDesc2')} <span className="font-bold text-white">CBEST</span>{t('home.heroDesc3')}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Holding Vision & Key Metrics */}
      <section id="sobre-nos" className="py-32 bg-[#f4f7fc] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-manrope text-slate-900 mb-8 leading-tight tracking-tight">
                {t('home.visionTitle')}
              </h2>
              <p className="text-xl text-slate-600 font-worksans mb-8 leading-relaxed font-light">
                {t('home.visionDesc')}
              </p>
              <ul className="space-y-6 mb-12">
                {[t('home.visionPoint1'), t('home.visionPoint2'), t('home.visionPoint3')].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center text-slate-700 font-medium text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <span className="w-10 h-10 rounded-full bg-[#7195e0]/10 flex items-center justify-center mr-4">
                      <CheckCircle2 className="w-6 h-6 text-[#7195e0]" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <div className="grid grid-cols-2 gap-6">
                <AnimatedCounter value="500" suffix="+" label={t('home.statVisas')} color="from-[#7195e0] to-[#5a7bc2]" />
                <AnimatedCounter value="12" suffix="+" label={t('home.statCountries')} color="from-[#b4c6ef] to-[#8faee0]" />
              </div>
            </motion.div>
            
            {/* Real Photography Side */}
            <motion.div 
              className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                alt="Equipa OneLink colaborando" 
                className="w-full h-full object-cover"
              />
              {/* Seamless gradient overlay with stat */}
              <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-12 flex flex-col justify-end">
                <div className="text-5xl md:text-6xl font-extrabold text-white font-manrope mb-2 drop-shadow-xl">800+</div>
                <div className="text-white/90 font-medium text-xl drop-shadow-lg">{t('home.statScholarships')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5 Trusted by Thousands Across Our Community */}
      <section className="py-24 bg-[#f4f7fc] relative overflow-hidden border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-slate-900 mb-6 tracking-tight">
              {t('home.trustTitle1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7195e0] to-[#5a7bc2]">{t('home.trustTitle2')}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
              {t('home.trustSubtitle')}
            </p>
          </motion.div>

          {/* Ultra Premium Social Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-16 max-w-5xl mx-auto">
            {/* FB */}
            <motion.div 
              className="relative group bg-white border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(113,149,224,0.2)] hover:border-[#7195e0]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center"
              initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: 0.1}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7195e0]/0 to-[#5a7bc2]/0 group-hover:from-[#7195e0]/5 group-hover:to-[#5a7bc2]/10 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7195e0]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#7195e0]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-[#f4f7fc] rounded-[1.25rem] flex items-center justify-center border border-slate-100 group-hover:border-[#7195e0]/30 group-hover:bg-white transition-all duration-500 relative z-10 shadow-sm group-hover:shadow-md">
                  <svg className="w-8 h-8 text-[#7195e0] group-hover:scale-110 transition-transform duration-500 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-manrope tracking-tight group-hover:text-[#7195e0] transition-colors duration-500 relative z-10"><InlineCounter value={t('home.trustFollowersFB')} suffix="K+" /></div>
              <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold group-hover:text-slate-700 transition-colors duration-500 relative z-10">Facebook</div>
            </motion.div>

            {/* IG */}
            <motion.div 
              className="relative group bg-white border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(113,149,224,0.2)] hover:border-[#7195e0]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center"
              initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: 0.2}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7195e0]/0 to-[#5a7bc2]/0 group-hover:from-[#7195e0]/5 group-hover:to-[#5a7bc2]/10 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7195e0]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#7195e0]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-[#f4f7fc] rounded-[1.25rem] flex items-center justify-center border border-slate-100 group-hover:border-[#7195e0]/30 group-hover:bg-white transition-all duration-500 relative z-10 shadow-sm group-hover:shadow-md">
                  <svg className="w-8 h-8 text-[#7195e0] group-hover:scale-110 transition-transform duration-500 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-manrope tracking-tight group-hover:text-[#7195e0] transition-colors duration-500 relative z-10"><InlineCounter value={t('home.trustFollowersIG')} suffix="K+" /></div>
              <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold group-hover:text-slate-700 transition-colors duration-500 relative z-10">Instagram</div>
            </motion.div>

            {/* TikTok */}
            <motion.div 
              className="relative group bg-white border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(113,149,224,0.2)] hover:border-[#7195e0]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center"
              initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: 0.3}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7195e0]/0 to-[#5a7bc2]/0 group-hover:from-[#7195e0]/5 group-hover:to-[#5a7bc2]/10 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7195e0]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#7195e0]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-[#f4f7fc] rounded-[1.25rem] flex items-center justify-center border border-slate-100 group-hover:border-[#7195e0]/30 group-hover:bg-white transition-all duration-500 relative z-10 shadow-sm group-hover:shadow-md">
                  <svg className="w-8 h-8 text-[#7195e0] group-hover:scale-110 transition-transform duration-500 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-manrope tracking-tight group-hover:text-[#7195e0] transition-colors duration-500 relative z-10"><InlineCounter value={t('home.trustFollowersTikTok')} suffix="K+" /></div>
              <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold group-hover:text-slate-700 transition-colors duration-500 relative z-10">TikTok</div>
            </motion.div>

            {/* YouTube */}
            <motion.div 
              className="relative group bg-white border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(113,149,224,0.2)] hover:border-[#7195e0]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center"
              initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: 0.4}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7195e0]/0 to-[#5a7bc2]/0 group-hover:from-[#7195e0]/5 group-hover:to-[#5a7bc2]/10 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7195e0]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#7195e0]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-[#f4f7fc] rounded-[1.25rem] flex items-center justify-center border border-slate-100 group-hover:border-[#7195e0]/30 group-hover:bg-white transition-all duration-500 relative z-10 shadow-sm group-hover:shadow-md">
                  <svg className="w-8 h-8 text-[#7195e0] group-hover:scale-110 transition-transform duration-500 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-manrope tracking-tight group-hover:text-[#7195e0] transition-colors duration-500 relative z-10"><InlineCounter value={t('home.trustFollowersYT')} suffix="K+" /></div>
              <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold group-hover:text-slate-700 transition-colors duration-500 relative z-10">YouTube</div>
            </motion.div>

            {/* WhatsApp Channel */}
            <motion.div 
              className="relative group bg-white border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(113,149,224,0.2)] hover:border-[#7195e0]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center"
              initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: 0.5}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7195e0]/0 to-[#5a7bc2]/0 group-hover:from-[#7195e0]/5 group-hover:to-[#5a7bc2]/10 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7195e0]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#7195e0]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-[#f4f7fc] rounded-[1.25rem] flex items-center justify-center border border-slate-100 group-hover:border-[#7195e0]/30 group-hover:bg-white transition-all duration-500 relative z-10 shadow-sm group-hover:shadow-md">
                  <MessageCircle className="w-8 h-8 text-[#7195e0] group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-manrope tracking-tight group-hover:text-[#7195e0] transition-colors duration-500 relative z-10"><InlineCounter value={t('home.trustFollowersWA')} suffix="K+" /></div>
              <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold group-hover:text-slate-700 transition-colors duration-500 relative z-10">WA Channel</div>
            </motion.div>

            {/* WhatsApp Groups */}
            <motion.div 
              className="relative group bg-white border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(113,149,224,0.2)] hover:border-[#7195e0]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center"
              initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: 0.6}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7195e0]/0 to-[#5a7bc2]/0 group-hover:from-[#7195e0]/5 group-hover:to-[#5a7bc2]/10 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7195e0]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              <div className="relative mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#7195e0]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-[#f4f7fc] rounded-[1.25rem] flex items-center justify-center border border-slate-100 group-hover:border-[#7195e0]/30 group-hover:bg-white transition-all duration-500 relative z-10 shadow-sm group-hover:shadow-md">
                  <Users className="w-8 h-8 text-[#7195e0] group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-manrope tracking-tight group-hover:text-[#7195e0] transition-colors duration-500 relative z-10"><InlineCounter value={t('home.trustMembersWAGroup')} suffix="K+" /></div>
              <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold group-hover:text-slate-700 transition-colors duration-500 relative z-10">WA Groups</div>
            </motion.div>
          </div>




        </div>
      </section>

      {/* 3. Venture Showcase */}
      <section id="nossas-marcas" className="py-32 bg-white relative overflow-hidden">
        {/* Ambient glowing background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-gradient-to-b from-[#7195e0]/5 to-transparent rounded-full opacity-70 blur-3xl pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-gradient-to-bl from-[#7195e0]/10 to-transparent rounded-full opacity-50 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-24 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#7195e0] font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">{t('home.ecosystemSubtitle')}</span>
            <h2 className="text-5xl md:text-6xl font-extrabold font-manrope text-slate-900 mb-6 tracking-tight">
              {t('home.ecosystemTitle1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7195e0] to-[#5a7bc2]">{t('home.ecosystemTitle2')}</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('home.ecosystemDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            {/* One Link Travel Feature */}
            <motion.div 
              onClick={() => navigate('/onelinktravel')}
              className="group relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(113,149,224,0.2)] transition-all duration-700 hover:-translate-y-2 flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Image Header Area */}
              <div className="h-[380px] w-full relative overflow-hidden flex items-center justify-center">
                 {/* Real photo background */}
                 <img 
                   src="/onelinktravelimages/hero-main.jpg" 
                   alt="Travel Destination" 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                 />
                 {/* Dark / Tint Overlay for premium contrast */}
                 <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-700 mix-blend-multiply"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
                 
                 {/* Floating Logo Pill */}
                 <div className="relative z-10 h-28 min-w-[240px] px-8 py-4 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-center transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 border border-white/50">
                   <img src="/onelinktravel-logo.png" alt="One Link Travel" className="max-h-full max-w-full object-contain" />
                 </div>
              </div>

              {/* Content Area */}
              <div className="px-10 pb-10 pt-12 relative z-20 flex-grow flex flex-col justify-between bg-white rounded-t-[2.5rem] -mt-8 border-t border-white/50">
                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {[t('home.tagWorkVisas'), t('home.tagStudentVisas'), t('home.tagTourism'), t('home.tagSchengenVisa')].map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-50 text-slate-600 border border-slate-200 transition-colors group-hover:border-[#7195e0]/30 group-hover:bg-[#7195e0]/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 font-manrope mb-4 group-hover:text-[#7195e0] transition-colors duration-500">
                    One Link Travel
                  </h3>
                  <p className="text-slate-500 text-lg mb-10 h-auto md:h-28 font-light leading-relaxed">
                    {t('home.travelDesc')}
                  </p>
                </div>
                
                <Link 
                  to="/onelinktravel"
                  className="inline-flex items-center gap-3 font-bold text-sm tracking-[0.15em] uppercase text-slate-900 group-hover:text-[#7195e0] transition-colors relative self-start overflow-hidden"
                >
                  {t('home.exploreServices')}
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#7195e0] group-hover:text-white transition-colors duration-500"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* CBEST Feature */}
            <motion.div 
              onClick={() => navigate('/cbest')}
              className="group relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(232,156,174,0.2)] transition-all duration-700 hover:-translate-y-2 flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {/* Image Header Area */}
              <div className="h-[380px] w-full relative overflow-hidden flex items-center justify-center">
                 {/* Real photo background */}
                 <img 
                   src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80" 
                   alt="University Campus" 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                 />
                 {/* Dark / Tint Overlay for premium contrast */}
                 <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-700 mix-blend-multiply"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
                 
                 {/* Floating Logo Pill */}
                 <div className="relative z-10 h-28 min-w-[240px] px-8 py-4 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-center transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 border border-white/50">
                   <img src="/cbest-logo.png" alt="CBEST" className="max-h-full max-w-full object-contain" />
                 </div>
              </div>

              {/* Content Area */}
              <div className="px-10 pb-10 pt-12 relative z-20 flex-grow flex flex-col justify-between bg-white rounded-t-[2.5rem] -mt-8 border-t border-white/50">
                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {[t('home.tagUniAdmission'), t('home.tagScholarships'), t('home.tagMentorship')].map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-50 text-slate-600 border border-slate-200 transition-colors group-hover:border-[#e89cae]/30 group-hover:bg-[#e89cae]/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 font-manrope mb-4 group-hover:text-[#e89cae] transition-colors duration-500">
                    CBEST
                  </h3>
                  <p className="text-slate-500 text-lg mb-10 h-auto md:h-28 font-light leading-relaxed">
                    {t('home.cbestDesc')}
                  </p>
                </div>
                
                <Link 
                  to="/cbest"
                  className="inline-flex items-center gap-3 font-bold text-sm tracking-[0.15em] uppercase text-slate-900 group-hover:text-[#e89cae] transition-colors relative self-start overflow-hidden"
                >
                  {t('home.exploreOpportunities')}
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#e89cae] group-hover:text-white transition-colors duration-500"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Our Team (Light Theme Aesthetic Redesign) */}
      <section id="equipa" className="py-32 relative bg-[#f4f7fc] overflow-hidden border-t border-slate-100">
        {/* Soft immersive background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#e0e7f7] to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#ffffff] to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold font-manrope text-slate-900 mb-6 tracking-tight">
              {t('home.visionSectionTitle1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7195e0] to-[#5a7bc2]">{t('home.visionSectionTitle2')}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed font-worksans">
              {t('home.visionSectionDesc')}
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto justify-center">
            {/* CEO */}
            <motion.div 
              className="relative w-full md:w-1/2 aspect-[3/4] rounded-[2rem] overflow-hidden group shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(113,149,224,0.4)] transition-all duration-700"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="/ourTeamImages/leonardo.png" 
                alt="Leonardo Eduardo" 
                className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] z-0 bg-[#0f172a]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
              
              {/* Subtle glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px] z-10"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 z-20 flex flex-col justify-end h-full">
                <div className="w-10 md:w-12 h-[3px] bg-[#a5c2ff] mb-3 md:mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-700"></div>
                <h3 className="text-2xl md:text-5xl font-extrabold text-white font-manrope mb-1 md:mb-2 tracking-tight drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-700">Leonardo Eduardo</h3>
                <p className="text-[#a5c2ff] font-bold text-[9px] md:text-xs tracking-[0.3em] uppercase md:mb-2 group-hover:-translate-y-2 transition-transform duration-700">{t('home.ceoRole')}</p>
                
                {/* Mobile Description (always visible) */}
                <p className="md:hidden text-white/85 text-[10px] leading-snug pt-2 drop-shadow-md">
                  {t('home.leonardoDescMobile')}
                </p>

                {/* Desktop Description (hover only) */}
                <div className="hidden md:grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-sm font-medium leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {t('home.leonardoDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Director */}
            <motion.div 
              className="relative w-full md:w-1/2 aspect-[3/4] rounded-[2rem] overflow-hidden group shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(113,149,224,0.4)] transition-all duration-700 md:mt-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src="/ourTeamImages/bernardo.png" 
                alt="Bernardo" 
                className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] z-0 bg-[#0f172a]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
              
              {/* Subtle glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px] z-10"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 z-20 flex flex-col justify-end h-full">
                <div className="w-10 md:w-12 h-[3px] bg-[#a5c2ff] mb-3 md:mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-700"></div>
                <h3 className="text-2xl md:text-5xl font-extrabold text-white font-manrope mb-1 md:mb-2 tracking-tight drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-700">Bernardo Adão</h3>
                <p className="text-[#a5c2ff] font-bold text-[9px] md:text-xs tracking-[0.3em] uppercase md:mb-2 group-hover:-translate-y-2 transition-transform duration-700">{t('home.directorRole')}</p>
                
                {/* Mobile Description (always visible) */}
                <p className="md:hidden text-white/85 text-[10px] leading-snug pt-2 drop-shadow-md">
                  {t('home.bernardoDescMobile')}
                </p>

                {/* Desktop Description (hover only) */}
                <div className="hidden md:grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-sm font-medium leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {t('home.bernardoDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4.5 Our Partners */}
      <section id="parceiros" className="py-24 bg-white relative overflow-hidden border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#7195e0] font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">{t('home.partnersSubtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-manrope text-slate-900 tracking-tight">
              {t('home.partnersTitle')}
            </h2>
          </motion.div>
        </div>

        <div className="relative overflow-hidden w-full max-w-[100vw] mx-auto group">
          {/* Edge fades for a seamless infinite scroll look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee space-x-8 whitespace-nowrap items-center w-max px-4">
            {[...globalPartners, ...globalPartners].map((partner, idx) => (
              <div 
                key={`${partner.name}-${idx}`} 
                className={`flex-shrink-0 w-56 h-32 bg-white border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-2xl flex items-center justify-center transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                  ['Parul University', 'Orel State University', 'EU Helpers'].includes(partner.name) ? 'p-2' : 'p-6'
                }`}
              >
                <img 
                  src={partner.img} 
                  alt={partner.name} 
                  className={`max-h-full max-w-full object-contain ${
                    ['Parul University', 'Orel State University', 'EU Helpers'].includes(partner.name) ? 'scale-[2.0]' : ''
                  }`} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.6 Success Stories */}
      <section className="py-24 bg-[#f4f7fc] relative overflow-hidden border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <h2 className="text-4xl md:text-5xl font-extrabold font-manrope text-slate-900 tracking-tight mb-6">
              {t('home.successStoriesTitle1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7195e0] to-[#5a7bc2]">{t('home.successStoriesTitle2')}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
              {t('home.successStoriesDesc')}
            </p>
          </motion.div>
        </div>
        
        {/* Visa Images Marquee */}
        <div className="relative overflow-hidden w-full max-w-[100vw] mx-auto group">
          {/* Edge fades for a seamless infinite scroll look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f4f7fc] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f4f7fc] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee space-x-6 whitespace-nowrap items-center w-max px-4">
            {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
              <div key={idx} className="flex-shrink-0 w-64 h-80 rounded-[2rem] overflow-hidden shadow-lg border border-slate-200 relative">
                <img src={`/visaImages/${num}.png`} alt={`Success Story ${num}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                  <CheckCircle className="w-4 h-4 text-[#7195e0]" />
                  <span className="text-slate-900 font-bold text-xs">Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Impact Bento Box - Ultra Premium Redesign */}
        <div className="max-w-7xl mx-auto px-4 mt-32 relative z-10 mb-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#7195e0] font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">Proven Results</span>
            <h2 className="text-5xl md:text-6xl font-extrabold font-manrope text-slate-900 mb-6 tracking-tight">
              {t('home.impactTitle1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7195e0] to-[#5a7bc2]">{t('home.impactTitle2')}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Bento Card 1: 1M+ Views */}
            <motion.div 
              className="md:col-span-8 group relative bg-white rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(113,149,224,0.15)] transition-all duration-700 hover:-translate-y-2 flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#7195e0]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#7195e0] to-[#5a7bc2] flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500 shrink-0">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight font-manrope mb-2 flex items-baseline">
                    <InlineCounter value="1" suffix="M+" />
                  </div>
                  <p className="text-xl md:text-2xl text-slate-500 font-light">{t('home.impact1')}</p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2: 73K+ Community */}
            <motion.div 
              className="md:col-span-4 group relative bg-gradient-to-br from-[#7195e0] to-[#5a7bc2] rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-[0_15px_50px_-15px_rgba(113,149,224,0.3)] transition-all duration-700 hover:-translate-y-2 flex flex-col justify-between"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shrink-0 transform group-hover:-translate-y-1 transition-transform duration-500 border border-white/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-extrabold text-white tracking-tight font-manrope mb-2">
                  <InlineCounter value="73" suffix="K+" />
                </div>
                <p className="text-lg text-white/90 font-medium">{t('home.impact2')}</p>
              </div>
            </motion.div>

            {/* Bento Card 3: Successful Visas */}
            <motion.div 
              className="md:col-span-5 group relative bg-slate-900 rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Animated dashed lines background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#7195e0]/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-[1rem] bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-12 transform group-hover:scale-110 transition-transform duration-500">
                  <CheckCircle className="w-7 h-7 text-[#a5c2ff]" />
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-white font-manrope mb-3 leading-tight group-hover:text-[#a5c2ff] transition-colors duration-500">{t('home.impact3')}</h4>
                  <p className="text-slate-400 font-light text-lg">{t('home.impact3Desc')}</p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 4: Trusted Worldwide */}
            <motion.div 
              className="md:col-span-7 group relative bg-white rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(113,149,224,0.15)] transition-all duration-700 hover:-translate-y-2 flex items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tr from-[#f8c1cc]/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-8 w-full">
                <div className="flex -space-x-4 mb-4 sm:mb-0 shrink-0">
                  {clientAvatars.map((url, i) => (
                    <div key={i} className={`w-16 h-16 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-md transform transition-transform duration-500 hover:-translate-y-2 hover:scale-110`} style={{ zIndex: 40 - i * 10 }}>
                      <img src={url} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-full border-4 border-white bg-[#7195e0] text-white font-bold text-sm flex items-center justify-center shadow-md transform transition-transform duration-500 hover:-translate-y-2 hover:scale-110" style={{ zIndex: 0 }}>
                    +10K
                  </div>
                </div>
                
                <div>
                  <h4 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-manrope mb-2 group-hover:text-[#7195e0] transition-colors duration-500">{t('home.impact4')}</h4>
                  <p className="text-slate-500 text-lg font-light">{t('home.impact4Desc')}</p>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 5. FAQs */}
      <section id="faqs" className="py-32 bg-[#f4f7fc] relative overflow-hidden">
        {/* Ambient glowing background effects */}
        <div className="absolute top-40 -left-40 w-[50rem] h-[50rem] bg-gradient-to-tr from-[#7195e0]/10 to-transparent rounded-full opacity-60 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-[60rem] h-[60rem] bg-gradient-to-bl from-[#e89cae]/10 to-transparent rounded-full opacity-40 blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#7195e0] font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">{t('home.faqSubtitle')}</span>
            <h2 className="text-5xl md:text-6xl font-extrabold font-manrope text-slate-900 mb-6 tracking-tight">
              {t('home.faqTitle1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7195e0] to-[#5a7bc2]">{t('home.faqTitle2')}</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('home.faqDesc')}
            </p>
          </motion.div>
          
          <div className="relative z-10">
            <FAQItem 
              question={t('home.faq1q')}
              answer={t('home.faq1a')}
            />
            <FAQItem 
              question={t('home.faq2q')}
              answer={t('home.faq2a')}
            />
            <FAQItem 
              question={t('home.faq3q')}
              answer={t('home.faq3a')}
            />
            <FAQItem 
              question={t('home.faq4q')}
              answer={t('home.faq4a')}
            />
            <FAQItem 
              question={t('home.faq5q')}
              answer={t('home.faq5a')}
            />
          </div>
        </div>
      </section>

      {/* 6. Contact Info Banner */}
      <section className="bg-white py-16 px-6 md:px-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Opening Hours */}
          <div className="flex flex-col items-start lg:w-1/4">
            <h4 className="text-slate-900 font-bold mb-4">{t('home.contactBannerOpening')}</h4>
            <div className="flex items-center text-slate-600 gap-3">
              <Clock className="w-5 h-5 text-[#7195e0]" />
              <span className="font-medium text-sm">{t('home.contactBannerHours')}</span>
            </div>
          </div>

          {/* Central Message */}
          <div className="text-center lg:w-2/4">
            <h3 className="text-2xl md:text-3xl font-extrabold font-manrope text-slate-900 leading-tight">
              {t('home.contactBannerTitle')}
            </h3>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start lg:items-end lg:w-1/4 gap-4">
            <h4 className="text-slate-900 font-bold lg:self-end">{t('home.contactBannerContact')}</h4>
            <div className="flex items-center gap-3 text-slate-600">
              <Phone className="w-5 h-5 text-[#7195e0]" />
              <a href="tel:+244922475109" className="font-medium text-sm hover:text-[#7195e0] transition-colors">+244 922 475 109</a>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Mail className="w-5 h-5 text-[#7195e0]" />
              <a href="mailto:geral@onelinkholding.com" className="font-medium text-sm hover:text-[#7195e0] transition-colors">geral@onelinkholding.com</a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
