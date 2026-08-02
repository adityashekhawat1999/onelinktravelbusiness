import React from 'react';
import { Link } from 'react-router-dom';

const CBESTPlaceholder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcc2ab] via-[#a6c1ee] to-[#6d94df] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-[2rem] border border-white p-12 max-w-2xl text-center shadow-xl">
        <h1 className="text-4xl font-bold font-manrope mb-6 text-slate-900">CBEST</h1>
        <p className="text-lg text-slate-600 mb-8 font-worksans">
          Programas de Bolsas de Estudo Internacionais. Página em desenvolvimento.
        </p>
        <Link 
          to="/" 
          className="inline-block px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          Voltar para a Holding
        </Link>
      </div>
    </div>
  );
};

export default CBESTPlaceholder;
