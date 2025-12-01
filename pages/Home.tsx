import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Award, GraduationCap, TrendingUp, Users, ArrowDown, Mail, Phone, MessageSquare } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

const Home: React.FC = () => {
  const { profile, skills, education } = useProfile();

  // Filter visible skills
  const visibleSkills = skills.filter(s => s.isVisible);
  
  // Prepare data for the chart (adding the 'full' property for background bar)
  const chartData = visibleSkills.map(skill => ({
    ...skill,
    full: 100
  }));

  // Filter visible education
  const visibleEducation = education.filter(e => e.isVisible);

  // Helper to clean phone for WhatsApp link
  const getWhatsAppLink = (phone: string) => {
    const cleanNumber = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}`;
  };

  // Images to form the background panel grid
  const bgImages = [
    'https://picsum.photos/400/300?random=101',
    'https://picsum.photos/400/300?random=102',
    'https://picsum.photos/400/300?random=103',
    'https://picsum.photos/400/300?random=104',
    'https://picsum.photos/400/300?random=105',
    'https://picsum.photos/400/300?random=106',
    'https://picsum.photos/400/300?random=107',
    'https://picsum.photos/400/300?random=108',
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-brand-purple">
        {/* Background Grid Panel */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1 opacity-30">
          {bgImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-full overflow-hidden">
               <img 
                 src={img} 
                 alt="Background project" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
               />
            </div>
          ))}
        </div>

        {/* Purple Overlay Layer */}
        <div className="absolute inset-0 bg-brand-purple/80 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple via-transparent to-brand-purple/50 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium tracking-widest uppercase mb-6 border border-white/20">
            Portfolio Profissional
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            {profile.role}
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <Link to="/portfolio">
              <button className="px-10 py-4 bg-brand-orange text-white rounded-full font-bold text-lg hover:bg-white hover:text-brand-orange transition-all duration-300 shadow-xl hover:shadow-orange-500/20 transform hover:-translate-y-1">
                Ver Portfólio
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <ArrowDown size={32} />
        </div>
      </section>

      {/* Quem Somos / About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-5/12">
              <div className="relative group">
                <div className="absolute -inset-4 bg-brand-purple rounded-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 opacity-20"></div>
                <div className="absolute -inset-4 bg-brand-orange rounded-2xl transform -rotate-3 group-hover:rotate-0 transition-all duration-500 opacity-20 animation-delay-200"></div>
                <img 
                  src="https://picsum.photos/500/600?grayscale" 
                  alt="Professional Portrait" 
                  className="relative rounded-xl shadow-2xl w-full h-auto object-cover grayscale group-hover:grayscale-0 transition duration-500"
                />
              </div>
            </div>
            <div className="md:w-7/12">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-brand-rose rounded-full"></div>
                <h2 className="text-sm font-bold tracking-widest text-brand-rose uppercase">Quem Sou</h2>
              </div>
              <h3 className="text-4xl font-bold text-brand-dark mb-6 leading-tight">Paixão por conectar <br/> marcas e pessoas</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light whitespace-pre-line">
                {profile.bio}
              </p>
              
              <div className="mt-8 pt-8 border-t border-gray-100 flex gap-8">
                 <div>
                    <span className="block text-3xl font-bold text-brand-purple">5+</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">Anos Exp.</span>
                 </div>
                 <div>
                    <span className="block text-3xl font-bold text-brand-orange">120+</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">Projetos</span>
                 </div>
                 <div>
                    <span className="block text-3xl font-bold text-brand-rose">15x</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">ROAS Médio</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competencias / Skills Graph */}
      {visibleSkills.length > 0 && (
        <section className="py-24 bg-brand-bg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-brand-dark">Competências Principais</h2>
                <p className="mt-4 text-xl text-gray-500 font-light max-w-2xl mx-auto">
                Uma mistura equilibrada de metodologia baseada em dados e criatividade estratégica.
                </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-4xl mx-auto border border-gray-100">
                <div className="h-[250px] w-full"> {/* Reduced height to compress spacing */}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" barGap={-24} barCategoryGap={15} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#676363', fontWeight: 500, fontSize: 13 }} width={120} axisLine={false} tickLine={false} />
                    <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    {/* Background Bar (Track) */}
                    <Bar dataKey="full" barSize={12} radius={[0, 6, 6, 0]} fill="#f3f4f6" isAnimationActive={false} />
                    {/* Actual Value Bar */}
                    <Bar dataKey="level" barSize={12} radius={[0, 6, 6, 0]} animationDuration={1500}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#5A4797' : '#BD606C'} />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
                <div className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="p-3 bg-brand-orange/10 rounded-full mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <TrendingUp className="text-brand-orange" size={24} />
                    </div>
                    <span className="font-medium text-brand-dark">Alta Performance</span>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="p-3 bg-brand-purple/10 rounded-full mb-4 group-hover:bg-brand-purple/20 transition-colors">
                    <Users className="text-brand-purple" size={24} />
                    </div>
                    <span className="font-medium text-brand-dark">Gestão de CRM</span>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="p-3 bg-brand-rose/10 rounded-full mb-4 group-hover:bg-brand-rose/20 transition-colors">
                    <Award className="text-brand-rose" size={24} />
                    </div>
                    <span className="font-medium text-brand-dark">Branding</span>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="p-3 bg-brand-dark/10 rounded-full mb-4 group-hover:bg-brand-dark/20 transition-colors">
                    <GraduationCap className="text-brand-dark" size={24} />
                    </div>
                    <span className="font-medium text-brand-dark">Mentoria</span>
                </div>
            </div>
            </div>
        </section>
      )}

      {/* Formação / Education Cards */}
      {visibleEducation.length > 0 && (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 justify-center mb-4">
                <div className="h-1 w-8 bg-brand-purple rounded-full"></div>
                <span className="text-brand-purple font-bold tracking-widest uppercase text-sm">Educação</span>
                <div className="h-1 w-8 bg-brand-purple rounded-full"></div>
            </div>
            <h2 className="text-4xl font-bold text-brand-dark mb-16 text-center">Formação Acadêmica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visibleEducation.map((edu) => (
                <div key={edu.id} className="group bg-brand-bg rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-transparent hover:border-brand-purple relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-brand-purple/5 rounded-full group-hover:bg-brand-purple/10 transition-colors"></div>
                    
                    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                    <GraduationCap size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark mb-2 leading-tight">{edu.degree}</h3>
                    <p className="text-brand-purple font-semibold mb-4">{edu.institution}</p>
                    <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <p className="text-gray-500 text-sm font-mono">{edu.year}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden">
                
                {/* Left Side Info */}
                <div className="md:w-5/12 bg-white p-12 flex flex-col justify-center border-r border-gray-100">
                    <h2 className="text-4xl font-bold text-brand-dark mb-4">Vamos conversar?</h2>
                    <div className="w-16 h-1 bg-brand-dark mb-8"></div>
                    
                    <h3 className="text-lg font-bold text-brand-dark mb-6">Entre em contato</h3>
                    
                    <div className="space-y-6">
                        <a 
                          href={getWhatsAppLink(profile.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 text-brand-dark group hover:bg-green-50 p-2 -ml-2 rounded-lg transition-all"
                          title="Conversar no WhatsApp"
                        >
                            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <Phone className="" size={24} />
                            </div>
                            <span className="font-bold text-lg group-hover:text-green-700 transition-colors">{profile.phone}</span>
                        </a>
                        <div className="flex items-center gap-4 text-brand-dark group p-2 -ml-2">
                            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-brand-purple group-hover:text-white transition-colors">
                                <Mail className="" size={24} />
                            </div>
                            <span className="font-bold text-lg group-hover:text-brand-purple transition-colors">{profile.email}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="md:w-7/12 bg-gray-50 p-12">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">ENVIE-ME UMA MENSAGEM</h3>
                    <form className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Nome" 
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 text-gray-700"
                        />
                         <input 
                            type="email" 
                            placeholder="E-mail" 
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 text-gray-700"
                        />
                         <input 
                            type="text" 
                            placeholder="Assunto" 
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 text-gray-700"
                        />
                        <textarea 
                            placeholder="Sua mensagem" 
                            rows={4}
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 text-gray-700 resize-none"
                        ></textarea>
                        
                        <button 
                            type="button" 
                            className="bg-[#0066FF] text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                        >
                            Enviar Mensagem
                        </button>
                    </form>
                </div>

            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;