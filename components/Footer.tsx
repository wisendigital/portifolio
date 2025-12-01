import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl tracking-wide">WISEN<span className="font-light text-brand-orange">PORTFÓLIO</span></span>
          <p className="text-gray-400 text-sm mt-1">Conectando marcas e resultados.</p>
        </div>
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Wisen. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;