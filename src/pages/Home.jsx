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
  Play,
  Quote
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
                   src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80" 
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

              <div className="absolute bottom-0 left-0 right-0 p-5 pb-6 md:p-12 z-20 flex flex-col justify-end h-full">
                <div className="w-12 h-[3px] bg-[#a5c2ff] mb-4 md:mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-700"></div>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white font-manrope mb-1 md:mb-2 tracking-tight drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-700">Leonardo Eduardo</h3>
                <p className="text-[#a5c2ff] font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 group-hover:-translate-y-2 transition-transform duration-700">{t('home.ceoRole')}</p>
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

              <div className="absolute bottom-0 left-0 right-0 p-5 pb-6 md:p-12 z-20 flex flex-col justify-end h-full">
                <div className="w-12 h-[3px] bg-[#a5c2ff] mb-4 md:mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-700"></div>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white font-manrope mb-1 md:mb-2 tracking-tight drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-700">Bernardo Adão</h3>
                <p className="text-[#a5c2ff] font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 group-hover:-translate-y-2 transition-transform duration-700">{t('home.directorRole')}</p>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
