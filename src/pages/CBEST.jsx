import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  GraduationCap, BookOpen, PenTool, FileText, 
  Award, Languages, CheckSquare, Users, 
  ShieldCheck, Landmark, ArrowRight, Globe,
  Quote, MapPin, Phone, Mail, ChevronDown, Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const servicesPT = [
  { icon: Globe, title: "Bolsas de Estudo", desc: "Pesquisa personalizada e aplicação em bolsas de estudo em todo o mundo." },
  { icon: GraduationCap, title: "Admissão Universitária", desc: "Preparação e submissão de candidaturas para universidades internacionais." },
  { icon: PenTool, title: "Carta de Motivação", desc: "Elaboração profissional de cartas de motivação." },
  { icon: FileText, title: "Curriculum Vitae", desc: "Criação de CV internacional (Europass)." },
  { icon: Award, title: "Cartas de Recomendação", desc: "Preparação e revisão rigorosa." },
  { icon: Languages, title: "Tradução de Documentos", desc: "Tradução juramentada de documentos oficiais." },
  { icon: CheckSquare, title: "Revisão de Documentos", desc: "Verificação detalhada antes da submissão final." },
  { icon: Users, title: "Consultoria Académica", desc: "Orientação especializada para escolha de cursos, universidades e países." },
  { icon: Landmark, title: "Legalização", desc: "Acompanhamento para entidades competentes (MED, MIREX, Consulados)." },
];

const servicesEN = [
  { icon: Globe, title: "Scholarships", desc: "Personalized research and application for scholarships worldwide." },
  { icon: GraduationCap, title: "University Admission", desc: "Preparation and submission of applications to international universities." },
  { icon: PenTool, title: "Motivation Letter", desc: "Professional drafting of motivation letters." },
  { icon: FileText, title: "Curriculum Vitae", desc: "Creation of international CV (Europass)." },
  { icon: Award, title: "Recommendation Letters", desc: "Rigorous preparation and review." },
  { icon: Languages, title: "Document Translation", desc: "Certified translation of official documents." },
  { icon: CheckSquare, title: "Document Review", desc: "Detailed verification before final submission." },
  { icon: Users, title: "Academic Consulting", desc: "Specialized guidance on choosing courses, universities, and countries." },
  { icon: Landmark, title: "Legalization", desc: "Assistance with competent entities (MED, MIREX, Consulates)." },
];

const destinationsPT = [
  { name: "Portugal", img: "1589330273594-fade1ee91647", cols: "col-span-1 md:col-span-2 lg:col-span-2", desc: "Ensino de excelência com forte ligação à lusofonia." },
  { name: "Reino Unido", img: "1513635269975-59663e0ac1ad", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Tradição académica nas universidades mais antigas do mundo." },
  { name: "Alemanha", img: "1467269204594-9661b134dd2b", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Líder em inovação tecnológica e propinas subsidiadas." },
  { name: "Estados Unidos", img: "1501594907352-04cda38ebc29", cols: "col-span-1 md:col-span-2 lg:col-span-2", desc: "Campus vibrantes e os maiores programas de bolsas de mérito." },
  { name: "Canadá", img: "1550565118-3a14e8d0386f", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Educação de topo num dos países mais acolhedores." },
  { name: "França", img: "1499856871958-5b9627545d1a", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Cultura riquíssima e instituições de prestígio global." },
  { name: "Itália", img: "1523906834658-6e24ef2386f9", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "O berço do Renascimento e das belas artes." },
  { name: "Japão", img: "1493976040374-85c8e12f0c0e", cols: "col-span-1 md:col-span-2 lg:col-span-1", desc: "Tecnologia de ponta e uma cultura milenar única." },
  { name: "Turquia", img: "1524231757912-21f4fe3a7200", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "A ponte fascinante entre a Europa e a Ásia." },
  { name: "China", img: "1474181487882-5abf3f0ba6c2", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "A maior potência emergente no ensino superior." },
  { name: "Coreia do Sul", img: "1449844908441-8829872d2607", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Forte aposta na inovação, pesquisa e modernidade." },
  { name: "Polónia", img: "1532012197267-da84d127e765", cols: "col-span-1 md:col-span-2 lg:col-span-1", desc: "Ensino de alta qualidade com custo de vida atrativo." },
  { name: "Hungria", img: "1491841550275-ad7854e35ca6", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Forte tradição em medicina e engenharias." },
  { name: "Roménia", img: "1486406146926-c627a92ad1ab", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Destino emergente para estudantes internacionais." },
  { name: "República Checa", img: "1519865885898-a54a6f2c7eea", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "O coração da Europa com rica história estudantil." },
  { name: "Sérvia", img: "1517486808906-6ca8b3f04846", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Ambiente acolhedor e infraestruturas modernas." },
  { name: "Índia", img: "1548013146-72479768bada", cols: "col-span-1 md:col-span-2 lg:col-span-2", desc: "Instituições de excelência em tecnologia e ciência." }
];

const destinationsEN = [
  { name: "Portugal", img: "1589330273594-fade1ee91647", cols: "col-span-1 md:col-span-2 lg:col-span-2", desc: "Excellent education with strong ties to the Lusophone world." },
  { name: "United Kingdom", img: "1513635269975-59663e0ac1ad", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Academic tradition in the world's oldest universities." },
  { name: "Germany", img: "1467269204594-9661b134dd2b", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Leader in technological innovation and subsidized tuition." },
  { name: "United States", img: "1501594907352-04cda38ebc29", cols: "col-span-1 md:col-span-2 lg:col-span-2", desc: "Vibrant campuses and the largest merit scholarship programs." },
  { name: "Canada", img: "1550565118-3a14e8d0386f", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Top education in one of the most welcoming countries." },
  { name: "France", img: "1499856871958-5b9627545d1a", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Rich culture and globally prestigious institutions." },
  { name: "Italy", img: "1523906834658-6e24ef2386f9", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "The birthplace of the Renaissance and fine arts." },
  { name: "Japan", img: "1493976040374-85c8e12f0c0e", cols: "col-span-1 md:col-span-2 lg:col-span-1", desc: "Cutting-edge technology and a unique ancient culture." },
  { name: "Turkey", img: "1524231757912-21f4fe3a7200", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "The fascinating bridge between Europe and Asia." },
  { name: "China", img: "1474181487882-5abf3f0ba6c2", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "The largest emerging power in higher education." },
  { name: "South Korea", img: "1449844908441-8829872d2607", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Strong focus on innovation, research, and modernity." },
  { name: "Poland", img: "1532012197267-da84d127e765", cols: "col-span-1 md:col-span-2 lg:col-span-1", desc: "High-quality education with an attractive cost of living." },
  { name: "Hungary", img: "1491841550275-ad7854e35ca6", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Strong tradition in medicine and engineering." },
  { name: "Romania", img: "1486406146926-c627a92ad1ab", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Emerging destination for international students." },
  { name: "Czech Republic", img: "1519865885898-a54a6f2c7eea", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "The heart of Europe with a rich student history." },
  { name: "Serbia", img: "1517486808906-6ca8b3f04846", cols: "col-span-1 md:col-span-1 lg:col-span-1", desc: "Welcoming environment and modern infrastructure." },
  { name: "India", img: "1548013146-72479768bada", cols: "col-span-1 md:col-span-2 lg:col-span-2", desc: "Institutions of excellence in technology and science." }
];

const testimonialsPT = [
  {
    name: "John Jose Duarte Manuel",
    role: "Estudante",
    university: "Universidade de Çukurova",
    country: "Turquia",
    quote: "Processo de visto de estudante tranquilo para estudar na Turquia.",
    img: "/testimonialImages/JOHN JOSE DUARTE MANUEL.png"
  },
  {
    name: "Ernesto Kiteculo",
    role: "Estudante",
    university: "Universidade de Mineração de São Petersburgo",
    country: "Rússia",
    quote: "Orientação especializada tornou meu visto russo simples e seguro.",
    img: "/testimonialImages/Ernesto Kiteculo.png"
  },
  {
    name: "Zeferino Ribeiro",
    role: "Estudante",
    university: "Universidade de Petróleo e Gás de Ploiești",
    country: "Romênia",
    quote: "Apoio profissional garantiu admissão na universidade na Romênia.",
    img: "/testimonialImages/ZeferinoRibeiro.png"
  }
];

const testimonialsEN = [
  {
    name: "John Jose Duarte Manuel",
    role: "Student",
    university: "Çukurova University",
    country: "Turkey",
    quote: "Smooth student visa process to study in Turkey.",
    img: "/testimonialImages/JOHN JOSE DUARTE MANUEL.png"
  },
  {
    name: "Ernesto Kiteculo",
    role: "Student",
    university: "Saint Petersburg Mining University",
    country: "Russia",
    quote: "Specialized guidance made my Russian visa simple and secure.",
    img: "/testimonialImages/Ernesto Kiteculo.png"
  },
  {
    name: "Zeferino Ribeiro",
    role: "Student",
    university: "Petroleum-Gas University of Ploiești",
    country: "Romania",
    quote: "Professional support guaranteed my university admission in Romania.",
    img: "/testimonialImages/ZeferinoRibeiro.png"
  }
];

const CBEST = () => {
  const { t, language } = useLanguage();
  const currentDestinations = language === 'en' ? destinationsEN : destinationsPT;
  const currentServices = language === 'en' ? servicesEN : servicesPT;
  const currentTestimonials = language === 'en' ? testimonialsEN : testimonialsPT;
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const visibleDestinations = showAllDestinations ? currentDestinations : currentDestinations.slice(0, 6);

  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [interestType, setInterestType] = useState("");

  useEffect(() => {
    setInterestType("");
  }, [language]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_99e74c5',
      'template_ibifln7',
      form.current,
      'spMduFQep1jAVdCd1'
    )
      .then(() => {
        setShowPopup(true);
        form.current.reset();
        setIsSending(false);
        setTimeout(() => setShowPopup(false), 4000);
      }, (error) => {
        alert("Failed to send: " + error.text);
        setIsSending(false);
      });
  };

  return (
    <div className="pt-20 bg-[#fff5f6] overflow-hidden min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80" 
            alt="Campus Universitário" 
            className="w-full h-full object-cover scale-105 transform origin-center animate-[subtle-zoom_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        
        <motion.div 
          className="absolute top-40 -left-20 w-[40rem] h-[40rem] bg-gradient-to-tr from-[#c4778a]/30 to-[#e89cae]/30 rounded-full blur-[100px] z-0 pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-left"
            >
              <motion.span 
                variants={itemVariants}
                className="text-[#e89cae] font-semibold text-sm tracking-[0.2em] uppercase mb-4 block"
              >
                CBEST
              </motion.span>
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-extrabold font-manrope text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl"
              >
                {t('cbest.heroTitle1')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e89cae] to-[#c4778a]">{t('cbest.heroTitle2')}</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-slate-200 font-worksans leading-relaxed font-light drop-shadow-lg mb-10 max-w-xl"
              >
                {t('cbest.heroDesc')}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-full font-bold text-sm tracking-[0.1em] uppercase text-white bg-gradient-to-r from-[#c4778a] to-[#e89cae] shadow-lg shadow-[#c4778a]/30 hover:shadow-xl hover:shadow-[#c4778a]/50 hover:-translate-y-1 transition-all duration-300"
                >
                  {t('cbest.exploreServices')}
                </button>
                <button 
                  onClick={() => document.getElementById('destinos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-full font-bold text-sm tracking-[0.1em] uppercase text-white border border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                >
                  {t('cbest.exploreDestinations')}
                </button>
              </motion.div>
            </motion.div>

            {/* Glass Island */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
              className="hidden lg:block relative perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c4778a] to-[#e89cae] rounded-3xl blur-2xl opacity-20 transform -rotate-6"></div>
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#e89cae]/40 to-transparent rounded-bl-full pointer-events-none"></div>
                <GraduationCap className="w-16 h-16 text-[#e89cae] mb-6 drop-shadow-md" />
                <h3 className="text-3xl font-bold text-white font-manrope mb-4">{t('cbest.glassTitle')}</h3>
                <p className="text-slate-300 font-worksans leading-relaxed">
                  {t('cbest.glassDesc')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Serviços Section (Aceternity Style) */}
      <section id="servicos" className="py-32 relative z-10 bg-[#110a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-left mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-manrope text-white mb-4 tracking-tight">
              {t('cbest.servicesTitle')}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl font-worksans">
              {t('cbest.servicesDesc')}
            </p>
          </motion.div>

          {/* Seamless Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-white/[0.05]">
            {currentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group p-10 border-r border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-500 h-full flex flex-col"
                >
                  {/* Subtle hover gradient indicator on the left edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e89cae] to-[#c4778a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Icon className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors duration-500 mb-6" strokeWidth={1.5} />
                  
                  <h3 className="text-lg font-bold text-slate-200 font-manrope mb-3 group-hover:text-white transition-colors duration-500 tracking-wide">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-500 font-worksans text-sm leading-relaxed group-hover:text-slate-400 transition-colors duration-500">
                    {service.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Destinos Section */}
      <section id="destinos" className="py-32 relative bg-[#110a0d] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#c4778a]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl">
              <span className="text-[#e89cae] font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">{t('cbest.globalReach')}</span>
              <h2 className="text-5xl md:text-6xl font-extrabold font-manrope text-white mb-6 tracking-tight">
                {t('cbest.destTitle')}
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed font-worksans mb-6 md:mb-0">
                {t('cbest.destDesc')}
              </p>
            </div>
            <button 
              onClick={() => setShowAllDestinations(!showAllDestinations)}
              className="flex items-center gap-2 text-white font-semibold text-sm tracking-widest uppercase hover:text-[#e89cae] transition-colors whitespace-nowrap"
            >
              {showAllDestinations ? t('cbest.showLess') : t('cbest.seeMoreCountries')} <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showAllDestinations ? '-rotate-90' : ''}`} />
            </button>
          </motion.div>

          {/* Masonry-like Grid for Destinations */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {visibleDestinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                className={`relative rounded-3xl overflow-hidden group cursor-pointer ${dest.cols || 'col-span-1'}`}
              >
                <img 
                  src={`https://images.unsplash.com/photo-${dest.img}?auto=format&fit=crop&w=800&q=80`}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Sleek Dark Overlay (Replaces Glass Effect) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Aesthetic Typography Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500">
                  <div className="w-8 h-[2px] bg-[#c4778a] mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <h3 className="text-2xl font-bold text-white font-manrope mb-1 tracking-tight group-hover:-translate-y-1 transition-transform duration-500">
                    {dest.name}
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-slate-300 font-worksans text-sm font-light leading-relaxed transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {dest.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Centered Load More Button for better UX when showing all */}
          {!showAllDestinations && (
            <motion.div 
              className="mt-16 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <button 
                onClick={() => setShowAllDestinations(true)}
                className="px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300"
              >
                {t('cbest.seeMoreCountries')}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. Testemunhos Section */}
      <section className="py-32 relative bg-[#110a0d] overflow-hidden border-t border-white/[0.05]">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c4778a]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[#e89cae]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-20 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c4778a] font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">{t('cbest.successStories')}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-manrope text-white tracking-tight">
              {t('cbest.whatOurStudentsSay')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e89cae] to-[#c4778a]">{t('cbest.studentsSay')}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 pt-16">
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative bg-[#1a0f14]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl group transition-all duration-500 hover:-translate-y-2 hover:border-[#c4778a]/50 hover:shadow-[0_20px_40px_-15px_rgba(196,119,138,0.2)] flex flex-col h-full ${
                  index === 1 ? 'md:mt-16' : ''
                } ${index === 2 ? 'md:mt-8' : ''}`}
              >
                {/* Floating Avatar (Escapes the box) */}
                <div className="absolute -top-12 right-8 z-20">
                  <div className="relative transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#110a0d] shadow-2xl group-hover:border-[#c4778a] transition-colors duration-500">
                      <img 
                        src={testimonial.img} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-2 right-1 w-5 h-5 bg-[#c4778a] border-[3px] border-[#110a0d] rounded-full"></div>
                  </div>
                </div>

                <Quote className="w-14 h-14 text-[#c4778a]/20 mb-8 group-hover:text-[#c4778a]/60 transition-colors duration-500" />
                
                <p className="text-xl lg:text-2xl text-slate-200 font-manrope font-light leading-relaxed mb-10 flex-grow italic">
                  "{testimonial.quote}"
                </p>

                <div className="pt-6 border-t border-white/10 relative overflow-hidden">
                  {/* Subtle hover gradient in footer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c4778a]/0 via-[#c4778a]/5 to-[#c4778a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  
                  <h4 className="text-white font-bold text-lg font-manrope mb-1 relative z-10">{testimonial.name}</h4>
                  <p className="text-[#e89cae] text-sm font-semibold uppercase tracking-wider mb-4 relative z-10">{testimonial.role}</p>
                  <div className="flex items-start gap-2.5 text-slate-400 text-sm relative z-10">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#c4778a]" />
                    <span className="leading-snug">
                      {testimonial.university}, <br className="hidden xl:block"/>{testimonial.country}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#110a0d] relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c4778a]/20 rounded-full blur-[80px] pointer-events-none opacity-50"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight font-manrope drop-shadow-sm">
                {t('cbest.formTitle')}
              </h2>
              <p className="text-slate-300 text-base mb-10 font-medium max-w-md">
                {t('cbest.formDesc')}
              </p>

              <form ref={form} onSubmit={sendEmail} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input name="name" type="text" required placeholder={t('cbest.name')} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  <input name="email" type="email" required placeholder={t('cbest.email')} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  
                  <input name="age" type="number" required min="16" max="100" placeholder={t('cbest.age')} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  <input name="whatsapp" type="tel" required placeholder={t('cbest.whatsapp')} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  
                  <input name="country" type="text" required placeholder={t('cbest.countryOfInterest')} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  
                  <div className="relative">
                    <select 
                      name="application_type" 
                      required 
                      value={interestType}
                      onChange={(e) => setInterestType(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white focus:bg-[#1a0f14] focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-slate-800">{t('cbest.uniOrScholarship')}</option>
                      <option value={t('cbest.uniEnrollment')} className="text-slate-800">{t('cbest.uniEnrollment')}</option>
                      <option value={t('cbest.scholarship')} className="text-slate-800">{t('cbest.scholarship')}</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select 
                      name="funding" 
                      required={interestType !== t('cbest.uniEnrollment')} 
                      disabled={interestType === t('cbest.uniEnrollment')}
                      defaultValue="" 
                      className={`w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white focus:bg-[#1a0f14] focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md appearance-none cursor-pointer ${interestType === t('cbest.uniEnrollment') ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="" disabled className="text-slate-800">{t('cbest.partOrFull')}</option>
                      <option value={t('cbest.partiallyFunded')} className="text-slate-800">{t('cbest.partiallyFunded')}</option>
                      <option value={t('cbest.fullyFunded')} className="text-slate-800">{t('cbest.fullyFunded')}</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select 
                      name="scholarship_type" 
                      required={interestType !== t('cbest.uniEnrollment')}
                      disabled={interestType === t('cbest.uniEnrollment')}
                      defaultValue="" 
                      className={`w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white focus:bg-[#1a0f14] focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md appearance-none cursor-pointer ${interestType === t('cbest.uniEnrollment') ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="" disabled className="text-slate-800">{t('cbest.guaranteedOrSelection')}</option>
                      <option value={t('cbest.guaranteedScholarship')} className="text-slate-800">{t('cbest.guaranteedScholarship')}</option>
                      <option value={t('cbest.selectionBasedScholarship')} className="text-slate-800">{t('cbest.selectionBasedScholarship')}</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                
                <textarea name="message" rows="4" required placeholder={t('cbest.howHelp')} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder-slate-400 resize-none focus:bg-white/20 focus:border-[#c4778a] shadow-inner transition-all text-sm font-medium backdrop-blur-md"></textarea>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-6">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="terms" required className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#c4778a] focus:ring-[#c4778a] cursor-pointer backdrop-blur-sm" />
                    <label htmlFor="terms" className="text-[13px] text-slate-400 font-medium cursor-pointer hover:text-slate-200 transition-colors">{t('cbest.terms')}</label>
                  </div>
                  <button type="submit" disabled={isSending} className="relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-[#c4778a] to-[#e89cae] text-white px-10 py-4 rounded-full font-bold text-[14px] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 group/btn">
                    <span className="relative z-10">{isSending ? t('cbest.sending') : t('cbest.send')}</span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  </button>
                </div>
              </form>
            </div>

            <div className="h-[400px] md:h-[100%] rounded-[2.5rem] overflow-hidden relative shadow-2xl group-hover:shadow-[0_30px_60px_-15px_rgba(196,119,138,0.4)] transition-shadow duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-[#110a0d]/80 to-transparent z-10 pointer-events-none"></div>
              <img src="/onelinktravelimages/contact-side.jpg" alt="Contact Us" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>

          </div>
        </div>
      </section>

      {/* 9. Contact Info Banner */}
      <section className="bg-[#110a0d] py-16 px-6 md:px-20 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Opening Hours */}
          <div className="flex flex-col items-start lg:w-1/4">
            <h4 className="text-white font-bold mb-4">{t('home.contactBannerOpening')}</h4>
            <div className="flex items-center text-slate-300 gap-3">
              <Clock className="w-5 h-5 text-[#c4778a]" />
              <span className="font-medium text-sm">{t('home.contactBannerHours')}</span>
            </div>
          </div>

          {/* Central Message */}
          <div className="text-center lg:w-2/4">
            <h3 className="text-2xl md:text-3xl font-extrabold font-manrope text-white leading-tight">
              {t('home.contactBannerTitle')}
            </h3>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start lg:items-end lg:w-1/4 gap-4">
            <h4 className="text-white font-bold lg:self-end">{t('home.contactBannerContact')}</h4>
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-5 h-5 text-[#c4778a]" />
              <a href="tel:+244922475109" className="font-medium text-sm hover:text-[#c4778a] transition-colors">+244 922 475 109</a>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-5 h-5 text-[#c4778a]" />
              <a href="mailto:geral@onelinkholding.com" className="font-medium text-sm hover:text-[#c4778a] transition-colors">geral@onelinkholding.com</a>
            </div>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] bg-[#c4778a] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">{t('cbest.successTitle')}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}} />
    </div>
  );
};

export default CBEST;
