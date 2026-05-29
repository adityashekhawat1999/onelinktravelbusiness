import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Home = () => {
  // Helper function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace the strings below with the keys from your EmailJS dashboard
    emailjs.sendForm(
      'service_a3k37vj', 
      'template_6wcawc7', 
      form.current, 
      'M05Hd2zl43sBbpz_m'
    )
    .then((result) => {
        setShowPopup(true); // Shows the green success message
        form.current.reset(); // Clears the form fields
        setIsSending(false);
        setTimeout(() => setShowPopup(false), 3000); // Hides popup after 3 seconds
    }, (error) => {
        alert("Failed to send: " + error.text);
        setIsSending(false);
    });
  };

  return (
   
   <div className="w-full">
      
{/* SECÇÃO HERO (HOME) */}
<section id="home" className="relative w-full h-screen overflow-hidden">
  {/* Camada de Fundo */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/hero-main.jpg" 
      alt="A sua porta de entrada" 
      className="w-full h-full object-cover" 
    />
    <div className="absolute inset-0 bg-black/5"></div>
  </div>

  {/* Camada de Conteúdo */}
  <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 lg:px-32 max-w-5xl">
    {/* Título: Fonte menor e mais compacta conforme a imagem */}
    <h1 
      className="text-4xl sm:text-5xl md:text-[65px] font-medium text-black leading-[1.0] text-left tracking-tight"
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      A sua porta de <br />
      entrada para <br />
      oportunidades <br />
      globais
    </h1>
    
    {/* Botões - Tamanho reduzido e alinhamento da imagem */}
    <div className="mt-6 md:mt-8 flex flex-row items-center gap-3">
      <button 
        onClick={() => scrollToSection('contact')}
        className="bg-[#d1e4ff] text-black px-6 py-2.5 rounded-full text-[13px] font-medium hover:bg-white transition-all shadow-sm active:scale-95"
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        Contactar
      </button>

      <button 
        onClick={() => scrollToSection('services')}
        className="bg-white/90 text-black px-6 py-2.5 rounded-full text-[13px] font-medium hover:bg-black hover:text-white transition-all active:scale-95"
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        Explorar
      </button>
    </div>

    {/* Declaração de Missão - Texto pequeno e com espaçamento entre linhas reduzido */}
    <div className="mt-10 md:mt-12 max-w-lg">
      <p 
        className="text-black/80 text-[12px] md:text-[14px] tracking-tight leading-[1.4] font-medium"
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        Capacitamos viajantes angolanos com soluções especializadas em <br className="hidden md:block" />
        vistos. Navegue por viagens internacionais com confiança e precisão.
      </p>
    </div>
  </div>
</section>



{/* 2. SECÇÃO DE PAÍSES - VERSÃO PEQUENA E ESTILIZADA */}
<section id ="countries" className="py-12 px-6 md:px-20 bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0] min-h-screen flex flex-col justify-center overflow-hidden">
  
  <div className="text-center mb-10 relative z-10">
    <p 
      className="text-[11px] font-normal tracking-tight text-gray-700 mb-1" 
      style={{ fontFamily: 'var(--font-worksans)' }}
    >
      Países para onde o ajudamos a emigrar
    </p>
    <h2 
      className="text-2xl md:text-[40px] font-medium text-[#1e293b] max-w-2xl mx-auto leading-tight px-4" 
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      Países com apoio completo para imigração 
       
    </h2>
  </div>

  {/* Grid ultra-compacta */}
  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative z-10">
    {[
      {
    name: "PORTUGAL",
    desc: "Residência e trabalho na Europa",
    img: "/portugal.jpg",
    pdf: "/portugalDoc.pdf"
  },

  {
    name: "ALEMANHA",
    desc: "Grandes oportunidades profissionais seguras",
    img: "/germany.jpg",
    pdf: "/germanyDoc.pdf"
  },

  {
    name: "POLÓNIA",
    desc: "Mercado em crescimento na Europa",
    img: "/poland.jpg",
    pdf: "/polandDoc.pdf"
  },

  {
    name: "REPÚBLICA CHECA",
    desc: "Qualidade de vida e estabilidade",
    img: "/czech.jpg",
    pdf: "/czechRepublicDoc.pdf"
  },

  {
    name: "TURQUIA",
    desc: "Oportunidades estratégicas de residência",
    img: "/turkey.jpg",
    pdf: "/turkeyDoc.pdf"
  },

  {
    name: "ROMÉNIA",
    desc: "Boas oportunidades de trabalho e residência",
    img: "/romania.jpg",
    pdf: "/romaniaDoc.pdf"
  },

  {
    name: "SÉRVIA",
    desc: "Mercado acessível e em desenvolvimento",
    img: "/serbia.jpg",
    pdf: "/serbiaDoc.pdf"
  },

  {
    name: "HUNGRIA",
    desc: "Excelentes oportunidades académicas",
    img: "/hungary.jpg",
    pdf: "/hungaryDoc.pdf"
  },

  {
    name: "LITUÂNIA",
    desc: "Crescimento profissional na Europa",
    img: "/lithuania.jpg",
    pdf: "/lithuaniaDoc.pdf"
  },

  {
    name: "MONTENEGRO",
    desc: "Processos simples e ambiente acolhedor",
    img: "/montenegro.jpg",
    pdf: "/montenegroDoc.pdf"
  },

  {
    name: "ESLOVÁQUIA",
    desc: "Estabilidade e oportunidades internacionais",
    img: "/slovakia.jpg",
    pdf: "/slovakiaDoc.pdf"
  },

  {
    name: "HOLANDA",
    desc: "Qualidade de vida e oportunidades modernas",
    img: "/netherlands.jpg",
    pdf: "/netherlandsDoc.pdf"
  },
    ].map((country, index) => (
      <a
  key={index}
  href={country.pdf}
  download
  className="
    bg-white/95
    backdrop-blur-sm
    rounded-[35px]
    border border-white/40
    shadow-sm
    flex flex-col
    items-center
    justify-center
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-xl
    hover:bg-white
    cursor-pointer
    mx-auto
    w-full
    h-[180px]
    max-w-[260px]
    group
  "
>
        {/* Header Compacto */}
        <div className="flex items-center justify-center gap-3 w-full mb-3 px-4">
          <div className="w-10 h-10 overflow-hidden rounded-full shadow-inner border border-gray-100 flex-shrink-0">
            <img 
              src={country.img} 
              alt={country.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <h3 
            className="text-[12px] font-bold tracking-[0.05em] text-black" 
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            {country.name}
          </h3>
        </div>

        {/* Linha Tracejada Fina */}
        <div className="w-[75%] border-t-[1px] border-dashed border-gray-300 opacity-60 my-1"></div>

        {/* Descrição Compacta */}
        <p 
          className="text-gray-800 text-[11px] mt-3 leading-snug text-center px-5 font-medium" 
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          {country.desc}
        </p>
        <p className="text-[10px] text-blue-600 mt-3 opacity-0 group-hover:opacity-100 transition-all">
  Ver requisitos →
</p>
      </a>
    ))}
  </div>
</section>





{/* SECÇÃO 3: SERVIÇOS - DESIGN FIEL AO SCREENSHOT COM SUA LÓGICA MANTIDA */}
<section id="services" className="py-12 px-6 md:px-20 bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0] min-h-screen flex flex-col justify-center overflow-hidden">
  
  {/* Cabeçalho Idêntico à Imagem */}
  <div className="text-center mb-12">
    <p className="text-[12px] font-bold text-black mb-4 uppercase tracking-normal" 
       style={{ fontFamily: 'var(--font-worksans)' }}>
      Serviços
    </p>
    
    <h2 className="text-4xl md:text-[54px] font-medium text-black mb-6 tracking-tight leading-[1.1]" 
        style={{ fontFamily: 'var(--font-manrope)' }}>
      Soluções de vistos para cada objetivo
    </h2>
    
    <p className="text-gray-500 text-sm md:text-[15px] max-w-3xl mx-auto leading-relaxed mb-10" 
       style={{ fontFamily: 'var(--font-worksans)' }}>
      Explore as suas oportunidades internacionais com os nossos serviços completos de vistos. <br className="hidden md:block" />
      Compreendemos as exigências e complexidades dos processos internacionais.
    </p>

    {/* Os Dois Botões do Screenshot */}
    <div className="flex flex-row items-center justify-center gap-8">
      <button 
        onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-white border border-black text-black px-8 py-2.5 rounded-full font-bold text-[13px] hover:bg-black hover:text-white transition-all shadow-sm"
      >
        Explorar serviços
      </button>
      
      <button 
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex items-center gap-2 text-[13px] font-bold text-black hover:opacity-60 transition-all"
      >
        Contacte nos 
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>

  {/* Grid de Cards - Mantendo sua lógica de expansão e estrutura original */}
  <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
    {[
      { 
        title: "Visto de Trabalho", 
        desc: "Conectamos candidatos a oportunidades internacionais através de contratos de trabalho fornecidos por empresas parceiras.", 
        more: "Prestamos suporte completo com contratos de trabalho, documentação, preparação consular e acompanhamento durante todo o processo.",
        img: "/service-work.jpg" 
      },
      { 
        title: "Visto de Turismo", 
        desc: "Facilitamos o processo do visto de turismo com orientação segura e acompanhamento personalizado.", 
        more: "Auxiliamos na preparação dos documentos, formulários e organização do processo para maior segurança na solicitação do visto.",
        img: "/service-tourist.jpg" 
      },
      { 
        title: "Visto de Estudante", 
        desc: "Apoiamos estudantes na conquista de oportunidades académicas internacionais com acompanhamento especializado.", 
        more: "Oferecemos suporte em bolsas de estudo, admissões universitárias, documentação financeira e processos de visto.",
        img: "/service-student.jpg" 
      }
    ].map((service, i) => {
      const [isExpanded, setIsExpanded] = React.useState(false);

      return (
        <div 
          key={i} 
          className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-sm border border-white flex flex-col h-[440px] overflow-hidden transition-all duration-500 hover:-translate-y-1 mx-auto w-full max-w-[310px]"
        >
          {/* Área de Conteúdo */}
          <div className="p-6 pb-2 flex flex-col flex-none">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-black" style={{ fontFamily: 'var(--font-manrope)' }}>
              {service.title}
            </h3>
            
            <div className="text-gray-500 text-[11px] leading-relaxed" style={{ fontFamily: 'var(--font-worksans)' }}>
              <p className="text-black/70">{service.desc}</p>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 italic border-l border-black/10 pl-3">
                  {service.more}
                </p>
              </div>

              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 flex items-center gap-1 text-[9px] font-bold tracking-[0.1em] uppercase hover:text-black transition-all mb-1"
              >
                <span className="border-b border-black/20 pb-0.5">
                  {isExpanded ? 'Ver menos ↑' : 'Ler mais →'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Imagem */}
          <div className="relative flex-grow w-full overflow-hidden transition-all duration-500 ease-in-out">
             <img 
               src={service.img} 
               alt={service.title}
               className="absolute inset-0 w-full h-full object-cover" 
             />
          </div>
        </div>
      );
    })}
  </div>
</section>






{/* SECTION 4: IMAGE GALLERY & CONTACT */}
<section id="gallery" className="py-12 px-4 md:px-20 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0]">
  
  {/* Header Text - Smaller and more compact */}
  <div className="text-center mb-6 px-4">
    <h2 
      className="text-2xl md:text-[40px] font-medium text-black mb-2 tracking-tight leading-tight" 
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      A sua jornada global começa aqui
    </h2>
    <p 
      className="text-black/80 text-[11px] md:text-[13px] font-medium max-w-lg mx-auto leading-tight" 
      style={{ fontFamily: 'var(--font-worksans)' }}
    >
      Conecte-se com os nossos especialistas e transforme os seus sonhos de viagem em realidade
    </p>
  </div>


  {/* Image Bento Grid - Reduced heights to fit in viewport */}
  <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
    
    {/* First Image */}
    <div className="h-[200px] md:h-[320px] overflow-hidden shadow-lg">
      <img 
        src="/gallery-1.jpg" 
        alt="Travelers" 
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
      />
    </div>

    {/* Second Image */}
    <div className="h-[200px] md:h-[320px] overflow-hidden shadow-lg">
      <img 
        src="/gallery-2.jpg" 
        alt="Travelers by water" 
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
      />
    </div>

    {/* Bottom Wide Image */}
    <div className="col-span-1 md:col-span-2 h-[180px] md:h-[300px] overflow-hidden shadow-lg">
      <img 
        src="/gallery-3.jpg" 
        alt="Couple in desert" 
        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" 
      />
    </div>
  </div>

  {/* Contact Button */}
  <button 
    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
    className="bg-[#d1e4ff] text-black px-8 py-2.5 rounded-full font-medium text-[12px] hover:bg-white transition-all shadow-md active:scale-95"
    style={{ fontFamily: 'var(--font-worksans)' }}
  >
    Contacte-nos
  </button>
</section>





{/* SECÇÃO 5: HISTÓRIAS DE CLIENTES - FIEL À IMAGEM */}
<section className="py-20 px-6 md:px-20 min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#fcc2ab] via-[#a6c1ee] to-[#6d94df]">
  
  {/* Cabeçalho Compacto */}
  <div className="text-center mb-10">
    <h2 
      className="text-3xl md:text-[42px] font-medium text-black mb-3 tracking-tight" 
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      Histórias de Clientes
    </h2>
    <p 
      className="text-gray-600 text-[11px] md:text-sm font-normal tracking-wide" 
      style={{ fontFamily: 'var(--font-worksans)' }}
    >
      Experiências reais de viajantes que ajudamos
    </p>
  </div>

  {/* Grelha de Testemunhos */}
  <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        name: "John Jose Duarte Manuel",
        role: "Estudante",
        uni: "Universidade de Çukurova",
        loc: "Turquia",
        content: "Processo de visto de estudante tranquilo para estudar na Turquia.",
        img: "/client-1.jpg"
      },
      {
        name: "Graciana Isabel Paulo Mucuco",
        role: "Estudante",
        uni: "Universidade Széchenyi István",
        loc: "Hungria",
        content: "Apoio profissional garantiu admissão na universidade na Hungria.",
        img: "/client-2.jpg"
      },
      {
        name: "Ernesto Kiteculo",
        role: "Estudante",
        uni: "Universidade de Mineração de São Petersburgo",
        loc: "Rússia",
        content: "Orientação especializada tornou meu visto russo simples e seguro.",
        img: "/client-3.jpg"
      }
    ].map((client, index) => (
      <div 
        key={index} 
        className="bg-[#F2F2F2] rounded-[2rem] p-8 flex flex-col shadow-sm transition-all hover:shadow-md"
      >
        {/* Estrelas alinhadas à esquerda */}
        <div className="flex gap-0.5 mb-5 text-black">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Depoimento */}
        <p 
          className="text-black text-[13.5px] md:text-[14.5px] leading-snug mb-8 font-normal" 
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          {client.content}
        </p>

        {/* Info do Cliente */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
             <img 
               src={client.img} 
               alt={client.name} 
               className="w-full h-full object-cover" 
             />
          </div>
          <div className="text-left">
            <h4 
              className="text-[12px] font-bold text-black leading-tight" 
              style={{ fontFamily: 'var(--font-worksans)' }}
            >
              {client.name}
            </h4>
            <div 
              className="text-[10px] text-gray-600 font-medium leading-tight mt-0.5"
              style={{ fontFamily: 'var(--font-worksans)' }}
            >
              <p>{client.role}</p>
              <p>{client.uni}</p>
              <p>{client.loc}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>




{/* SECÇÃO 6: PORQUÊ ESCOLHER-NOS - ALINHAMENTO EXATO E FUNCIONAL */}
<section id="why-choose-us" className="py-10 md:py-16 px-6 md:px-20 min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#fbc2eb] via-[#a6c1ee] to-[#6d94df] relative overflow-hidden">
  
  {/* Header Text - Fixed Line Breaks */}
  <div className="text-center mb-16">
    <p 
      className="text-[11px] font-bold tracking-tight text-black mb-4" 
      style={{ fontFamily: 'var(--font-worksans)' }}
    >
      Por que nos escolher
    </p>
    
    {/* Main title in one line */}
    <h2 
      className="text-3xl md:text-[52px] font-medium text-black mb-6 tracking-tight text-center leading-tight" 
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      O seu parceiro de confiança em vistos
    </h2>
    
    {/* Subtext in two lines */}
    <p 
      className="text-black/70 text-xs md:text-sm max-w-lg mx-auto leading-relaxed" 
      style={{ fontFamily: 'var(--font-worksans)' }}
    >
      A One Link Travel oferece serviços de vistos de excelência, adaptados <br className="hidden md:block" /> às suas necessidades.
    </p>
  </div>

  {/* Features Grid */}
  <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
    {[
      {
        title: "Serviço profissional",
        desc: "Consultores experientes que compreendem os requisitos internacionais.",
        icon: (
          <svg className="w-14 h-14 mb-6 mx-auto text-black/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      },
      {
        title: "Processamento rápido",
        desc: "Gestão eficiente do processo para poupar tempo e reduzir o stress.",
        icon: (
          <svg className="w-14 h-14 mb-6 mx-auto text-black/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        title: "Preços acessíveis",
        desc: "Preços competitivos sem comprometer a qualidade e o apoio.",
        icon: (
          <svg className="w-14 h-14 mb-6 mx-auto text-black/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
        )
      }
    ].map((feature, i) => (
      <div key={i} className="text-center px-4">
        {feature.icon}
        <h3 
          className="text-2xl md:text-[32px] font-medium text-black mb-4" 
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          {feature.title}
        </h3>
        <p 
          className="text-black/60 text-[13px] leading-relaxed max-w-[260px] mx-auto" 
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          {feature.desc}
        </p>
      </div>
    ))}
  </div>

  {/* CTA Buttons with onClick Handlers */}
  <div className="flex items-center justify-center gap-8">
    <button 
      onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
      className="bg-white/90 backdrop-blur-sm text-black px-10 py-3 rounded-full font-bold text-sm hover:bg-white transition-all shadow-sm border border-black/10 active:scale-95"
      style={{ fontFamily: 'var(--font-worksans)' }}
    >
      Agendar consulta
    </button>
    
    <button 
      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      className="flex items-center gap-1.5 text-sm font-bold text-black hover:opacity-70 transition-all active:scale-95"
      style={{ fontFamily: 'var(--font-worksans)' }}
    >
      Saiba mais
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</section>






{/* SECTION 7: A NOSSA EQUIPA */}
<section id="team" className="py-20 px-6 text-center bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0] min-h-[85vh] flex flex-col justify-center overflow-hidden">
  <div className="max-w-6xl mx-auto w-full">
    
    {/* Header - Portuguese */}
    <div className="mb-16">
      <p 
        className="text-[11px] font-bold tracking-[0.4em] uppercase text-black mb-2" 
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        Equipa
      </p>
      <h2 
        className="text-4xl md:text-5xl font-medium text-gray-900" 
        style={{ fontFamily: 'var(--font-manrope)' }}
      >
        A Nossa Equipa
      </h2>
      <p 
        className="mt-4 text-gray-700 text-[13px] md:text-base max-w-2xl mx-auto font-medium"
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        Profissionais dedicados ao sucesso da sua jornada internacional.
      </p>
    </div>
    
    {/* Team Grid */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 lg:gap-32 w-full">
      
      {/* Leonardo - CEO (Slightly Larger) */}
      <div className="group text-center max-w-[320px]">
        {/* Circle container - Slightly larger size (w-64 h-64) */}
        <div className="w-56 h-56 md:w-64 md:h-64 mx-auto mb-8 relative overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105">
          <img 
            src="/team-ceo.png" 
            alt="Leonardo CEO" 
            className="w-full h-full object-cover object-top" 
          />
        </div>
        <h3 
          className="text-[16px] font-bold tracking-[0.1em] uppercase text-gray-900" 
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          LEONARDO EDUARDO
        </h3>
        <p 
          className="text-[10px] font-semibold text-gray-500 mt-1 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          CEO
        </p>
        <p 
          className="mt-6 text-[12px] text-gray-700 leading-relaxed font-medium"
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          Experiência sólida na orientação de processos internacionais com rigor e profissionalismo.
        </p>
      </div>

      {/* Bernardo - Director (Standard Size) */}
      <div className="group text-center max-w-[300px]">
        {/* Circle container - Standard size (w-48 h-48) */}
        <div className="w-48 h-48 md:w-52 md:h-52 mx-auto mb-8 relative overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105">
          <img 
            src="/team-cto.png" 
            alt="Bernardo Director" 
            className="w-full h-full object-cover object-top" 
          />
        </div>
        <h3 
          className="text-[16px] font-bold tracking-[0.1em] uppercase text-gray-900" 
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          BERNARDO ADÃO
        </h3>
        <p 
          className="text-[10px] font-semibold text-gray-500 mt-1 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          DIRECTOR
        </p>
        <p 
          className="mt-6 text-[12px] text-gray-700 leading-relaxed font-medium"
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          Coordenação estratégica para garantir processos rápidos e confiáveis.
        </p>
      </div>

    </div>
  </div>
</section>






{/* SECTION 8: PERGUNTAS FREQUENTES */}
<section id="faq" className="py-24 px-6 md:px-20 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0]">
  
  {/* Header matching Screenshot Style */}
  <div className="text-center mb-20 max-w-3xl px-4">
    <h2 
      className="text-4xl md:text-[54px] font-medium text-black mb-6 tracking-tight" 
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      Perguntas Frequentes
    </h2>
   <p 
  className="text-black/80 text-sm md:text-base font-normal max-w-none mx-auto whitespace-nowrap" 
  style={{ fontFamily: 'var(--font-worksans)' }}
>
  Encontre respostas às perguntas mais comuns sobre os nossos serviços de vistos
</p>
  </div>

  {/* FAQ Grid with Specific Icons from Screenshot */}
  <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
    {[
      { 
        q: "Quanto tempo demora o processamento do visto?", 
        a: "O prazo varia conforme o tipo de visto e o país de destino.", 
        icon: (
          <svg className="w-10 h-10 mb-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 8V12L15 15" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9" />
            <path d="M17 3.5L18.5 2M7 3.5L5.5 2" strokeLinecap="round" />
          </svg>
        ) 
      },
      { 
        q: "Que documentos são necessários?", 
        a: "Os documentos variam conforme a categoria do visto e a situação individual.", 
        icon: (
          <svg className="w-10 h-10 mb-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <circle cx="17" cy="7" r="3" />
            <path d="M12 14L12 20M9 17L15 17" strokeLinecap="round" />
          </svg>
        ) 
      },
      { 
        q: "Os seus serviços são confidenciais?", 
        a: "Garantimos total confidencialidade e proteção dos seus dados pessoais.", 
        icon: (
          <svg className="w-10 h-10 mb-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) 
      },
      { 
        q: "Podem ajudar em caso de recusa?", 
        a: "Prestamos apoio completo em reaplicações e recursos.", 
        icon: (
          <svg className="w-10 h-10 mb-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8V12M12 16H12.01" strokeLinecap="round" strokeWidth="2"/>
          </svg>
        ) 
      },
      { 
        q: "Quais são os vossos honorários?", 
        a: "Oferecemos preços transparentes, sem custos ocultos.", 
        icon: (
          <svg className="w-10 h-10 mb-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) 
      },
      { 
        q: "Prestam apoio para vários países?", 
        a: "Apoiamos processos de visto para diversos destinos internacionais.", 
        icon: (
          <svg className="w-10 h-10 mb-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 22a9 9 0 01-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9" strokeLinecap="round" />
            <path d="M8 12L11 15L16 9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) 
      }
    ].map((faq, index) => (
      <div key={index} className="text-center group transition-transform duration-300 hover:scale-105">
        <div className="text-black mb-2">
          {faq.icon}
        </div>
        <h3 
          className="text-[17px] md:text-[19px] font-bold text-black mb-3 leading-snug px-2" 
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          {faq.q}
        </h3>
        <p 
          className="text-black/70 text-[13px] md:text-[14px] leading-relaxed max-w-[280px] mx-auto font-medium" 
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          {faq.a}
        </p>
      </div>
    ))}
  </div>
</section>



{/* SECÇÃO 9: CONTACTO - FIEL AO SCREENSHOT */}
<section id="contact" className="py-20 px-6 md:px-20 min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#fcc2ab] via-[#a6c1ee] to-[#6d94df]">
  
  {/* Texto de Cabeçalho - Alinhamento Exato */}
  <div className="text-center mb-16">
    <h2 
      className="text-5xl md:text-7xl font-medium text-black mb-6 tracking-tight" 
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      Contacto
    </h2>
    <div className="space-y-1">
      <p 
        className="text-[12px] font-bold text-black" 
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        Sinta se à vontade para entrar em contacto connosco
      </p>
      <p 
        className="text-black/80 text-[13px] md:text-base font-normal" 
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        A nossa equipa está pronta para prestar orientação personalizada
      </p>
    </div>
  </div>

  {/* Grelha de Contacto */}
  <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
    
    {/* Coluna Email */}
    <div className="flex flex-col items-center text-center">
      <svg className="w-9 h-9 mb-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <h3 className="text-4xl font-normal text-black mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
        Email
      </h3>
      <p className="text-black/70 text-[13px] leading-snug mb-5 max-w-[240px]" style={{ fontFamily: 'var(--font-worksans)' }}>
        Entre em contacto connosco para assistência imediata e orientação profissional
      </p>
      <a 
        href="mailto:onelinkholding.geral@gmail.com" 
        className="text-[11px] font-medium border-b border-black pb-0.5 tracking-tight hover:opacity-60 transition-all"
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        onelinkholding.geral@gmail.com
      </a>
    </div>

    {/* Coluna Telefone */}
    <div className="flex flex-col items-center text-center">
      <svg className="w-9 h-9 mb-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <h3 className="text-4xl font-normal text-black mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
        Telefone
      </h3>
      <p className="text-black/70 text-[13px] leading-snug mb-5 max-w-[240px]" style={{ fontFamily: 'var(--font-worksans)' }}>
        A nossa equipa de apoio está disponível durante o horário comercial
      </p>
      <a 
        href="tel:+244922475109" 
        className="text-[11px] font-medium border-b border-black pb-0.5 tracking-tight hover:opacity-60 transition-all"
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        +244 922 475 109
      </a>
    </div>

    {/* Coluna Escritório */}
    <div className="flex flex-col items-center text-center">
      <svg className="w-9 h-9 mb-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <h3 className="text-4xl font-normal text-black mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
        Escritório
      </h3>
      <p className="text-black/70 text-[13px] leading-snug mb-5 max-w-[260px]" style={{ fontFamily: 'var(--font-worksans)' }}>
        Visite nossa sede<br></br>
        (clique no link abaixo)
      </p>
     <a 
  href="https://maps.google.com/?cid=12783176811415827790&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ" 
  target="_blank"
  rel="noopener noreferrer"
  className="text-[10px] font-medium border-b border-black pb-0.5 leading-relaxed max-w-[280px] hover:opacity-60 transition-all cursor-pointer"
  style={{ fontFamily: 'var(--font-worksans)' }}
>
  Maculusso, Rua Joaquim Capango, Referência: Igreja Sagrada Família, Prédio 65, 2ºAndar, Porta 7.
</a>
    </div>
  </div>
</section>




{/* SECTION 10: ENTRE EM CONTACTO CONNOSCO */}
<section id="contact-form" className="py-24 px-6 md:px-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8c1cc] via-[#b4c6ef] to-[#7195e0] relative overflow-hidden">
  <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
    
    {/* Form Side */}
    <div className="flex flex-col order-2 lg:order-1">
      <h2 
        className="text-4xl md:text-[54px] font-medium text-black mb-6 tracking-tight leading-tight" 
        style={{ fontFamily: 'var(--font-manrope)' }}
      >
        Entre em contacto <br /> connosco
      </h2>
      <p 
        className="text-black/80 text-sm md:text-base font-medium mb-10" 
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        Estamos prontos para ajudar na sua jornada internacional
      </p>

      {/* Logic linked: ref={form} and onSubmit={sendEmail} */}
      <form ref={form} onSubmit={sendEmail} className="space-y-6 max-w-xl">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black ml-1">Nome</label>
          <input 
            name="user_name" 
            type="text" 
            required 
            className="w-full bg-black/10 backdrop-blur-md border border-black/5 rounded-xl px-4 py-3 outline-none text-black placeholder-black/30 transition-all focus:bg-black/15" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black ml-1">Email</label>
          <input 
            name="user_email" 
            type="email" 
            required 
            className="w-full bg-black/10 backdrop-blur-md border border-black/5 rounded-xl px-4 py-3 outline-none text-black placeholder-black/30 transition-all focus:bg-black/15" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black ml-1">Mensagem</label>
          <textarea 
            name="message" 
            rows="6" 
            required 
            placeholder="Partilhe as suas questões sobre a sua viagem" 
            className="w-full bg-black/10 backdrop-blur-md border border-black/5 rounded-xl px-4 py-4 outline-none text-black placeholder-black/30 resize-none transition-all focus:bg-black/15"
          ></textarea>
        </div>

        {/* Checkbox matching the screenshot */}
        <div className="flex items-center gap-3 py-2">
          <input 
            type="checkbox" 
            id="terms" 
            className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer" 
            required
          />
          <label htmlFor="terms" className="text-xs font-medium text-black/70 cursor-pointer">
            Concordo com os termos de serviço
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSending}
          className={`bg-[#d1e4ff] text-black px-12 py-3 rounded-full font-bold text-sm hover:bg-white transition-all shadow-md active:scale-95 ${isSending ? 'opacity-50' : ''}`}
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          {isSending ? 'Enviar...' : 'Enviar'}
        </button>
      </form>

      {/* Footer Text from Screenshot */}
      <div className="mt-12">
  <p className="text-[13px] md:text-[14px] text-black/80 font-medium leading-relaxed">
    Também pode entrar em contacto connosco através do <br className="hidden md:block" />
    <span className="font-bold text-black">+244 922 475 109</span>
  </p>

  <div className="flex items-center gap-5 mt-5">
    
    <a
      href="https://www.instagram.com/cbest_onelinktravel/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-all duration-300"
    >
      <img
        src="/instagram.svg"
        alt="Instagram"
        className="w-7 h-7 opacity-80 hover:opacity-100"
      />
    </a>

    <a
      href="https://www.youtube.com/@cbest_onelinktravel"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-all duration-300"
    >
      <img
        src="/youtube.svg"
        alt="YouTube"
        className="w-7 h-7 opacity-80 hover:opacity-100"
      />
    </a>

    <a
      href="https://www.facebook.com/profile.php?id=61579546714192"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-all duration-300"
    >
      <img
        src="/facebook.svg"
        alt="Facebook"
        className="w-7 h-7 opacity-80 hover:opacity-100"
      />
    </a>

    <a
      href="https://www.tiktok.com/@cbest_onelinktravel"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-all duration-300"
    >
      <img
        src="/tiktok.svg"
        alt="TikTok"
        className="w-7 h-7 opacity-80 hover:opacity-100"
      />
    </a>

  </div>
</div>

    {/* Image Side - Rounded with specific frame style */}
    <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
      <div className="h-[400px] md:h-[650px] w-full max-w-[550px] relative">
        <img 
          src="/contact-side.jpg" 
          alt="Man on phone" 
          className="w-full h-full object-cover rounded-[80px] md:rounded-[120px] shadow-2xl" 
        />
      </div>
    </div>
  </div>

  {/* Success Popup */}
  {showPopup && (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 z-[200] animate-bounce">
      <span className="text-[11px] font-bold uppercase tracking-widest">
        Mensagem Enviada!
      </span>
    </div>
  )}
</section>

  

    </div>
  );
};

export default Home;
