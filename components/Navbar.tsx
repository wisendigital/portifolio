import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, Home, User, Star, LogIn, LogOut, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  
  const linkClasses = (path: string) => `
    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
    ${isActive(path) 
      ? 'bg-brand-purple text-white' 
      : 'text-brand-dark hover:bg-brand-purple/10 hover:text-brand-purple'}
  `;

  // Logo SVG Component based on the provided image
  const WisenLogo = () => (
    <svg width="140" height="45" viewBox="0 0 140 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#5A4797', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#F37712', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      {/* WISEN text approximation */}
      <text x="0" y="30" fontFamily="Poppins" fontWeight="800" fontSize="32" letterSpacing="-1">
        <tspan fill="#5A4797">WI</tspan>
        <tspan fill="#BD606C">S</tspan>
        <tspan fill="#BD606C">E</tspan>
        <tspan fill="#F37712">N</tspan>
      </text>
      {/* Leaf accent over I */}
      <path d="M42 2 C 52 -4, 52 14, 42 12 C 34 10, 36 2, 42 2" fill="#8e5a7e" />
      
      {/* PORTFOLIO subtext */}
      <text x="2" y="44" fontFamily="Poppins" fontWeight="300" fontSize="11" letterSpacing="4.5" fill="#5A4797" className="uppercase">
        PORTFÓLIO
      </text>
    </svg>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <WisenLogo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${isActive('/') ? 'text-brand-purple font-bold' : 'text-gray-500 hover:text-brand-purple'} transition`}>Currículo</Link>
            <Link to="/portfolio" className={`${isActive('/portfolio') ? 'text-brand-purple font-bold' : 'text-gray-500 hover:text-brand-purple'} transition`}>Portfólio</Link>
            
            <Link to="/planos" className={`${isActive('/planos') ? 'text-brand-purple font-bold' : 'text-gray-500 hover:text-brand-purple'} transition flex items-center gap-1`}>
               <Star size={16} className={isActive('/planos') ? 'fill-current' : ''} /> Planos
            </Link>

            {isAuthenticated ? (
              <>
                 <Link to="/admin" className={`${isActive('/admin') ? 'text-brand-purple font-bold' : 'text-gray-500 hover:text-brand-purple'} transition`}>
                    Admin
                 </Link>
                 <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium transition flex items-center gap-1 ml-4 border-l pl-4 border-gray-200">
                    <LogOut size={16} /> Sair
                 </button>
              </>
            ) : (
                <Link to="/login" className="bg-brand-purple text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#4a3a7d] transition flex items-center gap-2">
                    <LogIn size={16} /> Login
                </Link>
            )}
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-purple hover:bg-brand-purple/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className={linkClasses('/')}>
              <div className="flex items-center gap-2"><FileText size={18}/> Currículo</div>
            </Link>
            <Link to="/portfolio" onClick={() => setIsOpen(false)} className={linkClasses('/portfolio')}>
              <div className="flex items-center gap-2"><Briefcase size={18}/> Portfólio</div>
            </Link>
            <Link to="/planos" onClick={() => setIsOpen(false)} className={linkClasses('/planos')}>
               <div className="flex items-center gap-2"><Star size={18}/> Planos</div>
            </Link>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            {isAuthenticated ? (
               <>
                <Link to="/admin" onClick={() => setIsOpen(false)} className={linkClasses('/admin')}>
                    <div className="flex items-center gap-2"><User size={18}/> Área Admin</div>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                    <LogOut size={18}/> Sair
                </button>
               </>
            ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className={linkClasses('/login')}>
                    <div className="flex items-center gap-2"><LogIn size={18}/> Login Profissional</div>
                </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;