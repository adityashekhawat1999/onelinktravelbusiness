import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Clock, CheckCircle, Banknote, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const destinationsPT = [
  {
    name: "Portugal",
    desc: "Residência e trabalho",
    img: "/onelinktravelimages/portugal.jpg",
    pdf: "/catalogs/portugalDoc.pdf",
    details: { salary: "€920/mês", jobs: "Agricultura e Trabalho Agrícola", days: "5 dias/semana", accommodation: "Gratuito", experience: "Não é necessário" }
  },
  {
    name: "Alemanha",
    desc: "Oportunidades profissionais",
    img: "/onelinktravelimages/germany.jpg",
    pdf: "/catalogs/germanyDoc.pdf",
    details: { salary: "€1.850/mês (Líquido)", jobs: "Construção, Armazém, Hotelaria, Limpeza", hours: "8–10 h/dia", accommodation: "Gratuito", requirements: "Licenciatura, Inglês (B1)" }
  },
  {
    name: "Polónia",
    desc: "Mercado em crescimento",
    img: "/onelinktravelimages/poland.jpg",
    pdf: "/catalogs/polandDoc.pdf",
    details: { salary: "€1.300–1.800/mês (Líquido)", jobs: "Armazém, Produção, Construção, Soldagem", days: "5–6 dias/semana", accommodation: "Incluído", requirements: "Inglês (B1)" }
  },
  {
    name: "Eslováquia",
    desc: "Estabilidade garantida",
    img: "/onelinktravelimages/slovakia.jpg",
    pdf: "/catalogs/slovakiaDoc.pdf",
    details: { salary: "€1.200–1.800/mês", jobs: "Armazém, Condução, Auto, Construção", hours: "8–11 h/dia", accommodation: "Fornecido", requirements: "Inglês (B1)" }
  },
  {
    name: "Países Baixos",
    desc: "Oportunidades modernas",
    img: "/onelinktravelimages/netherlands.jpg",
    pdf: "/catalogs/netherlandsDoc.pdf",
    details: { salary: "€1.800–2.400/mês (Líquido)", jobs: "Operações de Armazém", hours: "8–11 h/dia + Horas Extras", accommodation: "Fornecido", requirements: "Inglês (B1)" }
  },
  {
    name: "Lituânia",
    desc: "Crescimento na Europa",
    img: "/onelinktravelimages/lithuania.jpg",
    pdf: "/catalogs/lithuaniaDoc.pdf",
    details: { salary: "€1.440–2.880/mês", jobs: "Construção Civil", hours: "8–12 h/dia", accommodation: "Incluído", requirements: "Licenciatura e Inglês (B1)" }
  },
  {
    name: "Hungria",
    desc: "Excelência académica",
    img: "/onelinktravelimages/hungary.jpg",
    pdf: "/catalogs/hungaryDoc.pdf",
    details: { salary: "€1.200–1.500/mês", jobs: "Construção Sazonal", hours: "8–10 h/dia", accommodation: "Disponível", requirements: "Inglês (B1)" }
  },
  {
    name: "Roménia",
    desc: "Trabalho e residência",
    img: "/onelinktravelimages/romania.jpg",
    pdf: "/catalogs/romaniaDoc.pdf",
    details: { salary: "€800–900/mês", jobs: "Processamento de Carnes, Doméstico", days: "5–6 dias/semana", accommodation: "Gratuito", requirements: "Inglês (B1)" }
  },
  {
    name: "República Checa",
    desc: "Qualidade de vida",
    img: "/onelinktravelimages/czech.jpg",
    pdf: "/catalogs/czechRepublicDoc.pdf",
    details: { salary: "€800–1.300/mês", jobs: "Construção, Armazém, Limpeza", hours: "8–12 h/dia", accommodation: "Fornecido", requirements: "Inglês (B1)" }
  },
  {
    name: "Turquia",
    desc: "Residência estratégica",
    img: "/onelinktravelimages/turkey.jpg",
    pdf: "/catalogs/turkeyDoc.pdf",
    details: { salary: "€800/mês (Líquido)", jobs: "Fábrica e Indústria", hours: "8 h/dia", days: "6 dias/semana", benefits: "Alojamento, Transporte e Seguro" }
  },
  {
    name: "Sérvia",
    desc: "Mercado acessível",
    img: "/onelinktravelimages/serbia.jpg",
    pdf: "/catalogs/serbiaDoc.pdf",
    details: { salary: "€700/mês", jobs: "Armazém, Jardinagem, Estradas", hours: "8 h/dia", benefits: "Alojamento, Refeições e Uniforme", requirements: "Inglês (B1)" }
  },
  {
    name: "Montenegro",
    desc: "Processos simples",
    img: "/onelinktravelimages/montenegro.jpg",
    pdf: "/catalogs/montenegroDoc.pdf",
    details: { salary: "€700/mês", jobs: "Manutenção e Ar Livre", week: "40 h/semana", accommodation: "Fornecido", extra: "Horas Extras e Feriados" }
  }
];

export const destinationsEN = [
  {
    name: "Portugal",
    desc: "Residence and work",
    img: "/onelinktravelimages/portugal.jpg",
    pdf: "/catalogs/portugalDoc.pdf",
    details: { salary: "€920/month", jobs: "Agriculture and Farming", days: "5 days/week", accommodation: "Free", experience: "Not required" }
  },
  {
    name: "Germany",
    desc: "Professional opportunities",
    img: "/onelinktravelimages/germany.jpg",
    pdf: "/catalogs/germanyDoc.pdf",
    details: { salary: "€1,850/month (Net)", jobs: "Construction, Warehouse, Hospitality, Cleaning", hours: "8–10 h/day", accommodation: "Free", requirements: "Degree, English (B1)" }
  },
  {
    name: "Poland",
    desc: "Growing market",
    img: "/onelinktravelimages/poland.jpg",
    pdf: "/catalogs/polandDoc.pdf",
    details: { salary: "€1,300–1,800/month (Net)", jobs: "Warehouse, Production, Construction, Welding", days: "5–6 days/week", accommodation: "Included", requirements: "English (B1)" }
  },
  {
    name: "Slovakia",
    desc: "Guaranteed stability",
    img: "/onelinktravelimages/slovakia.jpg",
    pdf: "/catalogs/slovakiaDoc.pdf",
    details: { salary: "€1,200–1,800/month", jobs: "Warehouse, Driving, Auto, Construction", hours: "8–11 h/day", accommodation: "Provided", requirements: "English (B1)" }
  },
  {
    name: "Netherlands",
    desc: "Modern opportunities",
    img: "/onelinktravelimages/netherlands.jpg",
    pdf: "/catalogs/netherlandsDoc.pdf",
    details: { salary: "€1,800–2,400/month (Net)", jobs: "Warehouse Operations", hours: "8–11 h/day + Overtime", accommodation: "Provided", requirements: "English (B1)" }
  },
  {
    name: "Lithuania",
    desc: "Growth in Europe",
    img: "/onelinktravelimages/lithuania.jpg",
    pdf: "/catalogs/lithuaniaDoc.pdf",
    details: { salary: "€1,440–2,880/month", jobs: "Civil Construction", hours: "8–12 h/day", accommodation: "Included", requirements: "Degree and English (B1)" }
  },
  {
    name: "Hungary",
    desc: "Academic excellence",
    img: "/onelinktravelimages/hungary.jpg",
    pdf: "/catalogs/hungaryDoc.pdf",
    details: { salary: "€1,200–1,500/month", jobs: "Seasonal Construction", hours: "8–10 h/day", accommodation: "Available", requirements: "English (B1)" }
  },
  {
    name: "Romania",
    desc: "Work and residence",
    img: "/onelinktravelimages/romania.jpg",
    pdf: "/catalogs/romaniaDoc.pdf",
    details: { salary: "€800–900/month", jobs: "Meat Processing, Domestic", days: "5–6 days/week", accommodation: "Free", requirements: "English (B1)" }
  },
  {
    name: "Czech Republic",
    desc: "Quality of life",
    img: "/onelinktravelimages/czech.jpg",
    pdf: "/catalogs/czechRepublicDoc.pdf",
    details: { salary: "€800–1,300/month", jobs: "Construction, Warehouse, Cleaning", hours: "8–12 h/day", accommodation: "Provided", requirements: "English (B1)" }
  },
  {
    name: "Turkey",
    desc: "Strategic residence",
    img: "/onelinktravelimages/turkey.jpg",
    pdf: "/catalogs/turkeyDoc.pdf",
    details: { salary: "€800/month (Net)", jobs: "Factory and Industry", hours: "8 h/day", days: "6 days/week", benefits: "Accommodation, Transport and Insurance" }
  },
  {
    name: "Serbia",
    desc: "Accessible market",
    img: "/onelinktravelimages/serbia.jpg",
    pdf: "/catalogs/serbiaDoc.pdf",
    details: { salary: "€700/month", jobs: "Warehouse, Gardening, Roads", hours: "8 h/day", benefits: "Accommodation, Meals and Uniform", requirements: "English (B1)" }
  },
  {
    name: "Montenegro",
    desc: "Simple processes",
    img: "/onelinktravelimages/montenegro.jpg",
    pdf: "/catalogs/montenegroDoc.pdf",
    details: { salary: "€700/month", jobs: "Maintenance and Outdoors", week: "40 h/week", accommodation: "Provided", extra: "Overtime and Holidays" }
  }
];

const ServiceCard = ({ service, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group flex flex-col bg-slate-50/90 backdrop-blur-sm shadow-xl shadow-slate-300/30 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 h-[480px]">
      <div className="p-6 pb-5 flex flex-col flex-shrink-0 transition-all duration-500">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 font-manrope">
          {service.title}
        </h3>

        <p className="text-slate-600 text-[13px] leading-relaxed mb-1 font-medium">
          {service.desc}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-slate-400 text-[13px] italic mt-2 border-l-2 border-slate-300 pl-3">
                {service.more}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-slate-500 hover:text-slate-800 transition-colors self-start"
        >
          {isExpanded 
            ? (language === 'en' ? 'SEE LESS ↑' : 'VER MENOS ↑') 
            : (language === 'en' ? 'READ MORE →' : 'LER MAIS →')}
        </button>
      </div>

      <div className="flex-1 min-h-0 relative overflow-hidden bg-slate-200">
        <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
    </div>
  );
};

export const videoDataPT = [
  { title: 'Visto de Trabalho', src: '/servicesVideos/VISTO TRABALHO.mp4', desc: 'Processo completo para trabalhar no estrangeiro.', position: 'object-[center_25%]' },
  { title: 'Visto de Estudante', src: '/servicesVideos/VISTO ESTUDANTE.mp4', desc: 'Concretize os seus estudos além-fronteiras.' },
  { title: 'Visto de Turismo', src: '/servicesVideos/VISTO TURISMO.mp4', desc: 'Explore o mundo com total tranquilidade.' },
  { title: 'Visto Schengen', src: '/servicesVideos/VISTO SCHENGEN.mp4', desc: 'Aceda a toda a Europa sem fronteiras.' }
];

export const videoDataEN = [
  { title: 'Work Visa', src: '/servicesVideos/VISTO TRABALHO.mp4', desc: 'Complete process to work abroad.', position: 'object-[center_25%]' },
  { title: 'Student Visa', src: '/servicesVideos/VISTO ESTUDANTE.mp4', desc: 'Achieve your studies across borders.' },
  { title: 'Tourist Visa', src: '/servicesVideos/VISTO TURISMO.mp4', desc: 'Explore the world with total peace of mind.' },
  { title: 'Schengen Visa', src: '/servicesVideos/VISTO SCHENGEN.mp4', desc: 'Access all of Europe without borders.' }
];

export const servicesPT = [
  {
    title: "Visto de Trabalho",
    desc: "Ligamos candidatos a oportunidades internacionais através de contratos de trabalho fornecidos por empresas parceiras.",
    more: "Fornecemos apoio completo com contratos de trabalho, documentação, preparação consular e acompanhamento durante todo o processo.",
    img: "/onelinktravelimages/service-work.jpg"
  },
  {
    title: "Visto de Turismo",
    desc: "Simplificamos o processo do visto de turismo com orientação fiável e apoio personalizado.",
    more: "Ajudamos na preparação de documentos, formulários e organização do processo para garantir maior segurança no pedido de visto.",
    img: "/onelinktravelimages/service-tourist.jpg"
  },
  {
    title: "Visto de Estudante",
    desc: "Apoiamos estudantes na concretização de oportunidades académicas internacionais com orientação especializada.",
    more: "Oferecemos apoio com bolsas de estudo, admissão universitária, documentação financeira e pedidos de visto de estudante.",
    img: "/onelinktravelimages/service-student.jpg"
  },
  {
    title: "Visto Schengen",
    desc: "Aceda à Europa sem fronteiras com o nosso serviço completo para a obtenção do Visto Schengen.",
    more: "Ajudamos no planeamento de itinerários, reservas, seguros e documentação necessária para a entrada no Espaço Schengen.",
    img: "/onelinktravelimages/service-schengen.png"
  }
];

export const servicesEN = [
  {
    title: "Work Visa",
    desc: "We connect candidates with international opportunities through employment contracts provided by partner companies.",
    more: "We provide complete support with employment contracts, documentation, consular preparation, and tracking throughout the entire process.",
    img: "/onelinktravelimages/service-work.jpg"
  },
  {
    title: "Tourist Visa",
    desc: "We simplify the tourist visa process with reliable guidance and personalized support.",
    more: "We assist with document preparation, forms, and process organization to ensure greater security in your visa application.",
    img: "/onelinktravelimages/service-tourist.jpg"
  },
  {
    title: "Student Visa",
    desc: "We support students in achieving international academic opportunities with specialized guidance.",
    more: "We offer support with scholarships, university admission, financial documentation, and student visa applications.",
    img: "/onelinktravelimages/service-student.jpg"
  },
  {
    title: "Schengen Visa",
    desc: "Access borderless Europe with our complete service for obtaining the Schengen Visa.",
    more: "We assist with itinerary planning, bookings, insurance, and the necessary documentation for entry into the Schengen Area.",
    img: "/onelinktravelimages/service-schengen.png"
  }
];

const VideoCard = ({ video, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setIsMuted(true);
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
      }
    }
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-3xl overflow-hidden group cursor-pointer border border-white/20 bg-slate-900 shadow-2xl aspect-[9/16] w-full"
      onClick={handleToggle}
    >
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted={isMuted}
        playsInline
        className={`absolute inset-0 w-full h-full transition-all duration-700 ${isPlaying ? 'object-contain scale-100 bg-black/90' : `object-cover scale-105 group-hover:scale-110 ${video.position || 'object-center'}`}`}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-80 group-hover:opacity-40'}`} />
      
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/30 text-white shadow-[0_0_40px_rgba(255,255,255,0.3)] transform transition-transform group-hover:scale-110">
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 w-full p-6 transition-transform duration-500 ${isPlaying ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="w-8 h-[2px] bg-white/50 mb-3"></div>
        <h3 className="text-xl md:text-2xl font-manrope font-bold text-white mb-2 drop-shadow-md tracking-tight leading-tight">{video.title}</h3>
        <p className="text-slate-300 font-worksans font-light text-xs md:text-sm drop-shadow-sm line-clamp-3">{video.desc}</p>
      </div>

      {isPlaying && (
        <div className="absolute top-6 right-6 flex gap-3 z-10">
           <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl text-white flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors shadow-lg">
             {isMuted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
             ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
             )}
           </button>
           <button onClick={handleFullscreen} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl text-white flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors shadow-lg">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
           </button>
           <button onClick={(e) => { e.stopPropagation(); handleToggle(); }} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl text-white flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors shadow-lg">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
           </button>
        </div>
      )}
    </motion.div>
  );
};
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-xl hover:bg-white/40 hover:border-white/70 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-8 py-6 text-left bg-transparent focus:outline-none group"
      >
        <span className="text-[16px] font-bold text-slate-900 font-manrope">{faq.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-700 group-hover:text-black transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-black' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-6 pt-1 text-[15px] text-slate-800 leading-relaxed font-medium">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OneLinkTravel = () => {
  const { language, t } = useLanguage();
  const currentDestinations = language === 'en' ? destinationsEN : destinationsPT;
  const currentVideos = language === 'en' ? videoDataEN : videoDataPT;
  const currentServices = language === 'en' ? servicesEN : servicesPT;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_k92qz8l',
      'template_pgwxjir',
      form.current,
      'RQvWc_EmOHHKH1E8E'
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
    <div className="w-full bg-white font-worksans overflow-hidden">

      {/* 1. HERO SECTION - Light Cinematic Overlay */}
      <section id="home" className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden bg-white">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="/onelinktravelimages/hero-main.jpg"
            alt="A sua porta de entrada"
            className="w-full h-full object-cover"
          />
          {/* Overlays removed to show the clear photo */}
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-12 max-w-7xl mx-auto flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-[3.5rem] sm:text-[4rem] md:text-[5rem] font-medium text-[#2c3e66] leading-[1.05] tracking-tight mb-8 font-manrope max-w-[90%] md:max-w-lg lg:max-w-2xl">
              {t('travel.heroTitle1')} <br />
              {t('travel.heroTitle2')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e89cae] to-[#7195e0]">
                {t('travel.heroTitle3')}
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto bg-[#d1e4ff] text-slate-900 px-8 py-3.5 rounded-full text-sm font-bold shadow-sm hover:bg-[#b4c6ef] transition-all active:scale-95"
              >
                {t('travel.contact')}
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="w-full sm:w-auto bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200 px-8 py-3.5 rounded-full text-sm font-bold shadow-sm hover:bg-white transition-all active:scale-95"
              >
                {t('travel.exploreServices')}
              </button>
            </div>

            <p className="text-black text-base md:text-lg font-medium max-w-xl leading-relaxed drop-shadow-md pr-4 md:pr-12">
              {t('travel.heroDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. COUNTRIES GRID - First Original Pastel Gradient */}
      <section id="countries" className="py-24 px-6 md:px-20 bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-slate-600 text-xs font-bold tracking-[0.2em] uppercase mb-3 block drop-shadow-sm">{t('travel.destSubtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm">
              {t('travel.destTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-20">
            {currentDestinations.slice(0, showAllDestinations ? undefined : 3).map((country, index) => (
              <div key={index} className="relative w-full h-[250px] z-10 hover:z-50 group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                  className="absolute inset-0 bg-[#1e293b] rounded-3xl overflow-hidden shadow-lg group-hover:-inset-x-3 group-hover:-inset-y-16 group-hover:shadow-2xl group-hover:shadow-black/50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col"
                >
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={country.img}
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Base Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-95 group-hover:backdrop-blur-md transition-all duration-500"></div>
                    {/* Darker overlay on hover for better legibility */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Unhovered View (Bottom Typography) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-8 group-hover:opacity-0">
                    <div className="w-8 h-[2px] bg-[#7195e0] mb-3"></div>
                    <h3 className="text-2xl font-bold text-white font-manrope mb-1 tracking-tight">
                      {country.name}
                    </h3>
                    <p className="text-slate-300 font-worksans text-sm font-light leading-relaxed">
                      {country.desc}
                    </p>
                  </div>

                  {/* Hovered View (Detailed Info) */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-[50ms] transform -translate-y-4 group-hover:translate-y-0 pointer-events-none">
                    <h3 className="text-3xl font-extrabold text-white font-manrope mb-4 text-center tracking-tight drop-shadow-lg">
                      {country.name}
                    </h3>

                    <div className="flex flex-col gap-2">
                      {country.details.salary && (
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/20 shadow-inner">
                          <Banknote className="w-5 h-5 text-[#f8c1cc]" strokeWidth={1.5} />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-300 font-bold tracking-widest uppercase">{t('travel.salary')}</span>
                            <span className="text-[13px] font-medium text-white">{country.details.salary}</span>
                          </div>
                        </div>
                      )}

                      {country.details.jobs && (
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/20 shadow-inner">
                          <Briefcase className="w-5 h-5 text-[#b4c6ef]" strokeWidth={1.5} />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-300 font-bold tracking-widest uppercase">{t('travel.jobs')}</span>
                            <span className="text-[12px] font-medium text-white leading-tight">{country.details.jobs}</span>
                          </div>
                        </div>
                      )}

                      {(country.details.hours || country.details.days || country.details.week) && (
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/20 shadow-inner">
                          <Clock className="w-5 h-5 text-[#7195e0]" strokeWidth={1.5} />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-300 font-bold tracking-widest uppercase">{t('travel.hours')}</span>
                            <span className="text-[12px] font-medium text-white leading-tight">
                              {[country.details.hours, country.details.days, country.details.week].filter(Boolean).join(" • ")}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-inner mt-1">
                        <CheckCircle className="w-5 h-5 text-[#e89cae] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="flex flex-col gap-1 w-full">
                          {country.details.accommodation && <span className="text-[11px] font-medium text-white flex justify-between"><span className="text-slate-300 mr-2">{t('travel.accommodation')}</span> <span className="text-right">{country.details.accommodation}</span></span>}
                          {country.details.requirements && <span className="text-[11px] font-medium text-white flex justify-between"><span className="text-slate-300 mr-2">{t('travel.requirements')}</span> <span className="text-right">{country.details.requirements}</span></span>}
                          {country.details.experience && <span className="text-[11px] font-medium text-white flex justify-between"><span className="text-slate-300 mr-2">{t('travel.experience')}</span> <span className="text-right">{country.details.experience}</span></span>}
                          {country.details.benefits && <span className="text-[11px] font-medium text-white flex justify-between"><span className="text-slate-300 mr-2">{t('travel.benefits')}</span> <span className="text-right truncate">{country.details.benefits}</span></span>}
                          {country.details.extra && <span className="text-[11px] font-medium text-white flex justify-between"><span className="text-slate-300 mr-2">{t('travel.extra')}</span> <span className="text-right truncate">{country.details.extra}</span></span>}
                        </div>
                      </div>
                      
                      {country.pdf && (
                        <a href={country.pdf} download className="mt-3 pointer-events-auto bg-white/20 hover:bg-white/30 transition-colors text-white py-2 rounded-xl text-center text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          {t('travel.clickMoreInfo')}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {!showAllDestinations && (
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => setShowAllDestinations(true)}
                className="px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-slate-900 font-bold text-sm tracking-widest hover:bg-white hover:shadow-xl transition-all duration-300 shadow-sm uppercase"
              >
                {t('travel.seeMoreCountries')}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. SERVICES SECTION - Redesigned matching screenshot */}
      <section id="services" className="py-24 px-6 md:px-20 bg-gradient-to-br from-[#f3d7df] via-[#d4dff2] to-[#a2b5dd] relative">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col items-center text-center mb-16 gap-6">
            <div className="max-w-4xl w-full">
              <span className="text-slate-700 text-xs font-bold tracking-[0.2em] uppercase mb-6 block">{t('travel.servicesSubtitle')}</span>
              <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm">
                {t('travel.servicesTitle')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
                {t('travel.servicesDesc')}
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 mt-2">
              <button onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  const y = element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }} className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-full border border-black hover:bg-slate-50 transition-colors">
                {t('travel.exploreServices')}
              </button>
              <button onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  const y = element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }} className="flex items-center gap-1 text-black font-bold text-sm hover:text-slate-700 transition-colors group cursor-pointer">
                {t('travel.contact')} <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">›</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {currentServices.map((service, i) => (
              <ServiceCard key={i} service={service} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* 3.5. CINEMATIC VIDEO SHOWCASE */}
      <section className="bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0] py-32 px-6 md:px-20 relative z-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16 gap-6">
            <div className="max-w-4xl w-full">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-slate-700 text-[11px] font-bold tracking-[0.3em] uppercase mb-6 block"
              >
                {t('travel.videosSubtitle')}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm"
              >
                {t('travel.videosTitle')}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium"
              >
                {t('travel.videosDesc')}
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {currentVideos.map((video, idx) => (
              <VideoCard key={idx} video={video} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY & STORIES - Second Original Pastel Gradient */}
      <section className="bg-gradient-to-br from-[#fcc2ab] via-[#a6c1ee] to-[#6d94df] py-24 px-6 md:px-20 relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm">
              {t('travel.galleryTitle')}
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
              {t('travel.galleryDesc')}
            </p>
          </div>

          {/* Cinematic Gallery Grid - With white borders to pop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px] mb-24">
            <div className="col-span-1 md:col-span-7 h-full overflow-hidden rounded-[2rem] group border-4 border-white/40 shadow-xl">
              <img src="/onelinktravelimages/gallery-3.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gallery" />
            </div>
            <div className="col-span-1 md:col-span-5 flex flex-col gap-4 h-full">
              <div className="h-1/2 overflow-hidden rounded-[2rem] group border-4 border-white/40 shadow-xl">
                <img src="/onelinktravelimages/gallery-1.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gallery" />
              </div>
              <div className="h-1/2 overflow-hidden rounded-[2rem] group border-4 border-white/40 shadow-xl">
                <img src="/onelinktravelimages/gallery-2.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gallery" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section id="why-choose-us" className="bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0] text-slate-900 py-32 px-6 md:px-20 relative overflow-hidden">

        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#d1e4ff]/30 rounded-full blur-[120px] mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">

          <div className="mb-24">
            <span className="text-slate-700 text-[11px] font-bold tracking-[0.3em] uppercase mb-6 block">{t('travel.advantageSubtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm">
              {t('travel.advantageTitle')}
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
              {t('travel.advantageDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full mb-20">
            {[
              {
                title: t('travel.adv1Title'),
                desc: t('travel.adv1Desc'),
                icon: <svg className="w-8 h-8 text-slate-800 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              },
              {
                title: t('travel.adv2Title'),
                desc: t('travel.adv2Desc'),
                icon: <svg className="w-8 h-8 text-slate-800 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              },
              {
                title: t('travel.adv3Title'),
                desc: t('travel.adv3Desc'),
                icon: <svg className="w-8 h-8 text-slate-800 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143z" /></svg>
              }
            ].map((feature, i) => (
              <div key={i} className="group flex flex-col items-center text-center bg-white/20 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-10 hover:-translate-y-3 hover:bg-white/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-white/60 transition-all duration-500 relative overflow-hidden">

                {/* Inner Card Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="w-20 h-20 rounded-full bg-white/40 shadow-inner flex items-center justify-center mb-8 border border-white/50 group-hover:scale-110 group-hover:bg-white/60 transition-all duration-500 relative z-10">
                  {feature.icon}
                </div>

                <h3 className="text-[22px] font-bold text-slate-900 mb-4 font-manrope relative z-10">{feature.title}</h3>
                <p className="text-slate-700 text-[14px] leading-relaxed font-medium max-w-[240px] relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>



        </div>
      </section>
      {/* 6. FAQ & CONTACT */}
      <section id="faq" className="bg-gradient-to-br from-[#fbc2eb] via-[#a6c1ee] to-[#6d94df] text-slate-900 py-32 px-6 md:px-20 relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl mx-auto mb-32">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm">
                {t('travel.faqTitle')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
                {t('travel.faqDesc')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { q: t('travel.faq1q'), a: t('travel.faq1a') },
                { q: t('travel.faq2q'), a: t('travel.faq2a') },
                { q: t('travel.faq3q'), a: t('travel.faq3a') },
                { q: t('travel.faq4q'), a: t('travel.faq4a') }
              ].map((faq, index) => (
                <FAQItem key={index} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact-section" className="bg-gradient-to-br from-[#f3d7df] via-[#d4dff2] to-[#a2b5dd] text-slate-900 py-32 px-6 md:px-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Contact Information Section (New) */}
          <div className="max-w-6xl mx-auto pb-32 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm">
                {t('travel.contact')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
                {t('travel.contactDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center px-4">
              {/* Email */}
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-slate-900 mb-6" strokeWidth={1.5} />
                <h3 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4 font-manrope">{t('travel.emailTitle')}</h3>
                <p className="text-slate-700 text-sm mb-6 max-w-[260px] mx-auto leading-relaxed">
                  {t('travel.emailDesc')}
                </p>
                <a href="mailto:geral@onelinkholding.com" className="text-slate-900 font-bold text-sm border-b border-slate-900 pb-0.5 hover:text-black transition-colors">
                  geral@onelinkholding.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-slate-900 mb-6" strokeWidth={1.5} />
                <h3 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4 font-manrope">{t('travel.phoneTitle')}</h3>
                <p className="text-slate-700 text-sm mb-6 max-w-[260px] mx-auto leading-relaxed">
                  {t('travel.phoneDesc')}
                </p>
                <a href="tel:+244922475109" className="text-slate-900 font-bold text-sm border-b border-slate-900 pb-0.5 hover:text-black transition-colors">
                  +244 922 475 109
                </a>
              </div>

              {/* Office */}
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-slate-900 mb-6" strokeWidth={1.5} />
                <h3 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4 font-manrope">{t('travel.officeTitle')}</h3>
                <p className="text-slate-700 text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
                  {t('travel.officeDesc')}
                </p>
                <a href="https://maps.google.com/?cid=12783176811415827790" target="_blank" rel="noreferrer" className="text-slate-900 font-bold text-[11px] leading-tight border-b border-slate-900 pb-0.5 hover:text-black transition-colors max-w-[280px] text-center">
                  Maculusso, Rua Joaquim Capango, Referência: Igreja Sagrada Família, Prédio 65, 2ºAndar, Porta 7.
                </a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/30 backdrop-blur-3xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">

            {/* Inner ambient glow for the glass card */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/40 rounded-full blur-[80px] pointer-events-none opacity-50"></div>

            {/* Contact Form */}
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight font-manrope drop-shadow-sm">
                {t('travel.formTitle')}
              </h2>
              <p className="text-slate-800 text-base mb-10 font-medium max-w-md">
                {t('travel.formDesc')}
              </p>

              <form ref={form} onSubmit={sendEmail} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input name="user_name" type="text" required placeholder={t('travel.name')} className="w-full bg-white/40 border border-white/50 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder-slate-600 focus:bg-white/60 focus:border-white shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  <input name="user_email" type="email" required placeholder={t('travel.email')} className="w-full bg-white/40 border border-white/50 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder-slate-600 focus:bg-white/60 focus:border-white shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  
                  <input name="user_age" type="number" required min="18" max="100" placeholder={t('travel.age')} className="w-full bg-white/40 border border-white/50 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder-slate-600 focus:bg-white/60 focus:border-white shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  <input name="user_whatsapp" type="tel" required placeholder={t('travel.phone')} className="w-full bg-white/40 border border-white/50 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder-slate-600 focus:bg-white/60 focus:border-white shadow-inner transition-all text-sm font-medium backdrop-blur-md" />
                  
                  <div className="relative">
                    <select name="user_country" required defaultValue="" className="w-full bg-white/40 border border-white/50 rounded-2xl px-5 py-4 outline-none text-slate-900 focus:bg-white/60 focus:border-white shadow-inner transition-all text-sm font-medium backdrop-blur-md appearance-none cursor-pointer">
                      <option value="" disabled>{t('travel.country')}</option>
                      {currentDestinations.map((dest, idx) => (
                        <option key={idx} value={dest.name}>{dest.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                  </div>
                  
                  <div className="relative">
                    <select name="user_visa" required defaultValue="" className="w-full bg-white/40 border border-white/50 rounded-2xl px-5 py-4 outline-none text-slate-900 focus:bg-white/60 focus:border-white shadow-inner transition-all text-sm font-medium backdrop-blur-md appearance-none cursor-pointer">
                      <option value="" disabled>{t('travel.visaTypePlaceholder')}</option>
                      <option value="Estudante">{t('travel.visaTypes.student')}</option>
                      <option value="Trabalho">{t('travel.visaTypes.work')}</option>
                      <option value="Turismo">{t('travel.visaTypes.tourist')}</option>
                      <option value="Schengen">{t('travel.visaTypes.schengen')}</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                  </div>
                </div>
                
                <textarea name="message" rows="4" required placeholder={t('travel.message')} className="w-full bg-white/40 border border-white/50 rounded-2xl px-5 py-4 outline-none text-slate-900 placeholder-slate-600 resize-none focus:bg-white/60 focus:border-white shadow-inner transition-all text-sm font-medium backdrop-blur-md"></textarea>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-6">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="terms" required className="w-4 h-4 rounded border-white/60 bg-white/40 text-slate-900 focus:ring-white/80 cursor-pointer backdrop-blur-sm" />
                    <label htmlFor="terms" className="text-[13px] text-slate-700 font-medium cursor-pointer hover:text-slate-900 transition-colors">{t('travel.terms')}</label>
                  </div>
                  <button type="submit" disabled={isSending} className="relative overflow-hidden w-full sm:w-auto bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-[14px] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_25px_-6px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 group/btn">
                    <span className="relative z-10">{isSending ? t('travel.sending') : t('travel.sendMessage')}</span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-slate-100/60 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  </button>
                </div>
              </form>
            </div>

            {/* Image Side */}
            <div className="h-[400px] md:h-[100%] rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 pointer-events-none"></div>
              <img src="/onelinktravelimages/contact-side.jpg" alt="Contact Us" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>

          </div>

        </div>
      </section>

      {/* Success Toast */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span className="text-sm font-bold uppercase tracking-wide">{t('travel.successTitle')}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default OneLinkTravel;
