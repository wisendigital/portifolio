

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  BarChart3, 
  Layout, 
  Users, 
  Zap, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X,
  Star,
  Monitor,
  Calendar,
  CreditCard
} from 'lucide-react';

const Sales: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Pricing Data Calculation
  const getPrice = (plan: 'basic' | 'pro') => {
    if (billingCycle === 'annual') {
        return plan === 'basic' ? '19,90' : '29,90';
    }
    return plan === 'basic' ? '29,90' : '39,90';
  };

  const getDiscount = (plan: 'basic' | 'pro') => {
      const annualPrice = plan === 'basic' ? 19.90 : 29.90;
      const monthlyPrice = plan === 'basic' ? 29.90 : 39.90;
      const discount = ((monthlyPrice - annualPrice) / monthlyPrice) * 100;
      return Math.round(discount);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark scroll-smooth">
      
      {/* --- HEADER (Landing Page Specific) --- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Placeholder */}
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-orange rounded-lg"></div>
               <span className="font-bold text-xl tracking-tight text-brand-dark">Wisen<span className="text-brand-purple">Pro</span></span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
              <button onClick={() => scrollToSection('como-funciona')} className="hover:text-brand-purple transition">Como funciona</button>
              <button onClick={() => scrollToSection('para-quem')} className="hover:text-brand-purple transition">Para quem é</button>
              <button onClick={() => scrollToSection('recursos')} className="hover:text-brand-purple transition">Recursos</button>
              <button onClick={() => scrollToSection('preco')} className="hover:text-brand-purple transition">Preço</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-brand-purple transition">FAQ</button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/login" className="bg-brand-purple text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#4a3a7d] transition shadow-lg hover:shadow-brand-purple/20">
                Criar meu portfólio
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-xl absolute w-full left-0">
             <button onClick={() => scrollToSection('como-funciona')} className="block w-full text-left py-2 font-medium text-gray-600">Como funciona</button>
             <button onClick={() => scrollToSection('para-quem')} className="block w-full text-left py-2 font-medium text-gray-600">Para quem é</button>
             <button onClick={() => scrollToSection('recursos')} className="block w-full text-left py-2 font-medium text-gray-600">Recursos</button>
             <button onClick={() => scrollToSection('preco')} className="block w-full text-left py-2 font-medium text-gray-600">Preço</button>
             <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 font-medium text-gray-600">FAQ</button>
             <Link to="/login" className="block w-full text-center bg-brand-purple text-white py-3 rounded-lg font-bold mt-4">
                Criar meu portfólio
             </Link>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl opacity-70"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brand-dark leading-tight mb-6">
                Mostre resultados. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-rose">
                  Feche mais contratos.
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-brand-dark/80 mb-6">
                Seu portfólio profissional por <span className="bg-brand-orange/10 text-brand-orange px-2 rounded">R$ 19,90/mês</span>.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Crie um portfólio claro e organizado para apresentar resultados de tráfego, social media, design e qualquer outro serviço. 
                Envie um único link e aumente sua taxa de fechamento.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white rounded-full font-bold text-lg hover:bg-[#e06600] transition shadow-lg hover:shadow-brand-orange/30 transform hover:-translate-y-1 text-center">
                  Criar meu portfólio agora
                </Link>
                <button onClick={() => scrollToSection('como-funciona')} className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-full font-bold text-lg hover:bg-gray-50 transition text-center">
                  Ver como funciona
                </button>
              </div>
            </div>

            {/* Visual Mockup */}
            <div className="lg:w-1/2 w-full">
               <div className="relative rounded-2xl bg-gray-900 p-2 md:p-4 shadow-2xl transform rotate-1 hover:rotate-0 transition duration-700">
                  {/* Browser Toolbar */}
                  <div className="flex items-center gap-2 mb-4 bg-gray-800 p-2 rounded-lg">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-gray-900 h-6 rounded flex items-center px-3 text-xs text-gray-500 font-mono">
                      wisen.com/seu-portfolio
                    </div>
                  </div>
                  
                  {/* Interface Mockup */}
                  <div className="bg-white rounded-lg overflow-hidden h-[300px] md:h-[400px] flex">
                     {/* Sidebar */}
                     <div className="w-16 md:w-20 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-6 gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-purple/20"></div>
                        <div className="w-6 h-6 rounded bg-gray-200"></div>
                        <div className="w-6 h-6 rounded bg-gray-200"></div>
                        <div className="w-6 h-6 rounded bg-gray-200"></div>
                     </div>
                     {/* Content Area */}
                     <div className="flex-1 p-6 overflow-hidden">
                        <div className="flex gap-4 mb-6">
                           <div className="h-20 w-20 rounded-full bg-gray-200 shrink-0"></div>
                           <div className="space-y-2 pt-2">
                              <div className="h-6 w-48 bg-gray-800 rounded"></div>
                              <div className="h-4 w-32 bg-brand-orange rounded"></div>
                           </div>
                        </div>
                        {/* Grid */}
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <div className="bg-gray-100 h-24 rounded-lg relative overflow-hidden">
                                 <div className="absolute inset-x-0 bottom-0 h-12 bg-brand-purple/20 flex items-end justify-center px-2 pb-2 gap-1">
                                    <div className="w-2 bg-brand-purple h-4 rounded-t"></div>
                                    <div className="w-2 bg-brand-purple h-8 rounded-t"></div>
                                    <div className="w-2 bg-brand-purple h-6 rounded-t"></div>
                                    <div className="w-2 bg-brand-purple h-10 rounded-t"></div>
                                 </div>
                              </div>
                              <div className="h-3 w-20 bg-gray-200 rounded"></div>
                           </div>
                           <div className="space-y-2">
                              <div className="bg-gray-100 h-24 rounded-lg"></div>
                              <div className="h-3 w-20 bg-gray-200 rounded"></div>
                           </div>
                           <div className="space-y-2">
                              <div className="bg-gray-100 h-24 rounded-lg"></div>
                              <div className="h-3 w-20 bg-gray-200 rounded"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- O QUE É (Concept) --- */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
             Seu trabalho precisa ser mostrado, não explicado.
           </h2>
           <p className="text-xl text-gray-600 leading-relaxed">
             O sistema organiza seus cases, prints e números em uma página profissional. 
             Serve para quem entrega tráfego, social media, design, branding e qualquer serviço que dependa de prova.
           </p>
        </div>
      </section>

      {/* --- PARA QUEM É (Target Audience) --- */}
      <section id="para-quem" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-brand-dark mb-4">Para quem este portfólio foi pensado</h2>
             <div className="w-20 h-1 bg-brand-purple mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {[
               { icon: <MessageSquare size={32}/>, label: "Profissionais de Social Media" },
               { icon: <BarChart3 size={32}/>, label: "Gestores de Tráfego" },
               { icon: <Layout size={32}/>, label: "Designers" },
               { icon: <Zap size={32}/>, label: "Freelancers" },
               { icon: <Users size={32}/>, label: "Pequenas Agências" },
             ].map((item, idx) => (
               <div key={idx} className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-brand-purple/5 transition-colors border border-transparent hover:border-brand-purple/20 group text-center h-full">
                  <div className="mb-4 text-brand-dark group-hover:text-brand-purple transition-colors p-3 bg-white rounded-full shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800">{item.label}</h3>
               </div>
             ))}
           </div>
           
           <div className="mt-12 text-center text-lg text-gray-500 italic">
             ...e qualquer pessoa que precisa apresentar resultados de forma clara.
           </div>
        </div>
      </section>

      {/* --- RECURSOS (Features) --- */}
      <section id="recursos" className="py-24 bg-brand-dark text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white/5"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-8 border-white/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            <div className="md:w-1/2">
               <h2 className="text-3xl md:text-4xl font-bold mb-8">
                 O que você consegue fazer com a plataforma
               </h2>
               <ul className="space-y-5">
                 {[
                   "Criar um portfólio completo em minutos",
                   "Organizar cases por categoria (tráfego, social media, etc.)",
                   "Mostrar antes e depois dos projetos",
                   "Publicar prints de resultados (Meta, Google, Analytics)",
                   "Apresentar métricas de forma limpa e profissional",
                   "Adicionar depoimentos de clientes",
                   "Atualizar tudo em tempo real",
                   "Gerar um link único para enviar ao cliente"
                 ].map((feature, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="mt-1 bg-brand-orange rounded-full p-0.5">
                       <Check size={14} className="text-white" strokeWidth={3} />
                     </div>
                     <span className="text-lg text-gray-200">{feature}</span>
                   </li>
                 ))}
               </ul>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                   <div className="bg-green-500 rounded-full p-2 text-white">
                      <Check size={20} />
                   </div>
                   <div>
                      <p className="text-sm text-gray-300">Status</p>
                      <p className="font-bold text-white">Portfólio Publicado</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                      <span className="text-gray-300">Case Black Friday</span>
                      <span className="text-green-400 font-mono text-sm">+150% ROI</span>
                   </div>
                   <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                      <span className="text-gray-300">Identidade TechStart</span>
                      <span className="text-brand-purple font-mono text-sm">Visual</span>
                   </div>
                   <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                      <span className="text-gray-300">Lançamento E-book</span>
                      <span className="text-green-400 font-mono text-sm">10k Leads</span>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENEFÍCIOS (Por que funciona) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Por que isso ajuda você a fechar mais contratos</h2>
              <p className="text-lg text-gray-600 mb-4">
                Clientes fecham com quem mostra resultado. 
                Em vez de tentar explicar tudo em mensagem de WhatsApp ou áudio, você manda um link e deixa os números falarem por você.
              </p>
              <p className="text-lg text-brand-purple font-medium">
                Seu portfólio vira um argumento de venda. Profissionaliza sua apresentação e aumenta sua taxa de conversão.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-brand-bg rounded-2xl border-t-4 border-brand-orange shadow-sm hover:shadow-lg transition">
                 <div className="mb-4 text-brand-orange"><Star size={40} /></div>
                 <h3 className="text-xl font-bold text-brand-dark mb-3">Mais autoridade na negociação</h3>
                 <p className="text-gray-600">Chegue na reunião com provas organizadas. Quem tem dados domina a conversa.</p>
              </div>
              <div className="p-8 bg-brand-bg rounded-2xl border-t-4 border-brand-purple shadow-sm hover:shadow-lg transition">
                 <div className="mb-4 text-brand-purple"><Layout size={40} /></div>
                 <h3 className="text-xl font-bold text-brand-dark mb-3">Menos tempo explicando</h3>
                 <p className="text-gray-600">Não perca horas descrevendo o que você faz. Mostre. O visual vende mais rápido que o texto.</p>
              </div>
              <div className="p-8 bg-brand-bg rounded-2xl border-t-4 border-brand-rose shadow-sm hover:shadow-lg transition">
                 <div className="mb-4 text-brand-rose"><Monitor size={40} /></div>
                 <h3 className="text-xl font-bold text-brand-dark mb-3">Apresentação Profissional</h3>
                 <p className="text-gray-600">Serve para qualquer nicho. Transmita confiança desde o primeiro clique no seu link.</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- COMO FUNCIONA (Passo a Passo) --- */}
      <section id="como-funciona" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-brand-dark text-center mb-16">Como funciona na prática</h2>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Crie sua conta", desc: "Cadastro rápido para acessar o painel." },
                { step: "2", title: "Adicione seus cases", desc: "Suba imagens, gráficos e resultados." },
                { step: "3", title: "Personalize", desc: "Coloque sua bio, foto e contatos." },
                { step: "4", title: "Envie e Feche", desc: "Mande o link único e impressione." },
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                   <div className="w-16 h-16 rounded-full bg-brand-purple text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-brand-purple/30 z-10 relative">
                     {item.step}
                   </div>
                   {i < 3 && (
                     <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 -z-0"></div>
                   )}
                   <h3 className="text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
                   <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="text-center mt-12 bg-white inline-block px-6 py-3 rounded-full shadow-sm mx-auto border border-gray-200">
             <p className="text-brand-purple font-medium flex items-center gap-2">
               <Zap size={18} /> Não precisa saber programar. Tudo é visual e rápido.
             </p>
           </div>
        </div>
      </section>

      {/* --- PROVA SOCIAL (Depoimentos) --- */}
      <section className="py-24 bg-white border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-dark text-center mb-16">O que outros profissionais estão fazendo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Testimonial 1 */}
               <div className="bg-gray-50 p-8 rounded-2xl relative">
                  <div className="absolute -top-4 left-8 text-brand-purple text-6xl opacity-20">"</div>
                  <p className="text-gray-700 italic mb-6 relative z-10">
                    Antes eu mandava PDF gigante, agora mando o link Wisen. O cliente vê os posts e os gráficos de engajamento na hora. Facilitou muito.
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                     <div>
                        <p className="font-bold text-brand-dark text-sm">Mariana Costa</p>
                        <p className="text-xs text-brand-orange font-bold uppercase">Social Media</p>
                     </div>
                  </div>
               </div>

               {/* Testimonial 2 */}
               <div className="bg-gray-50 p-8 rounded-2xl relative">
                  <div className="absolute -top-4 left-8 text-brand-purple text-6xl opacity-20">"</div>
                  <p className="text-gray-700 italic mb-6 relative z-10">
                    O ROI ficou claro. Pararam de me perguntar 'onde foi o dinheiro'. O portfólio explica sozinho os resultados das campanhas.
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                     <div>
                        <p className="font-bold text-brand-dark text-sm">Carlos Eduardo</p>
                        <p className="text-xs text-brand-purple font-bold uppercase">Gestor de Tráfego</p>
                     </div>
                  </div>
               </div>

               {/* Testimonial 3 */}
               <div className="bg-gray-50 p-8 rounded-2xl relative">
                  <div className="absolute -top-4 left-8 text-brand-purple text-6xl opacity-20">"</div>
                  <p className="text-gray-700 italic mb-6 relative z-10">
                    A galeria visual junto com os dados de conversão das Landing Pages mudou meu jogo de negociação. Profissionalismo total.
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                     <div>
                        <p className="font-bold text-brand-dark text-sm">Fernanda Lima</p>
                        <p className="text-xs text-brand-rose font-bold uppercase">Designer Web</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Mockup for Social Proof */}
            <div className="mt-16 text-center">
               <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest">Exemplos de layouts gerados</p>
               <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="w-24 h-32 bg-gray-200 rounded border border-gray-300"></div>
                  <div className="w-24 h-32 bg-gray-300 rounded border border-gray-400"></div>
                  <div className="w-24 h-32 bg-gray-200 rounded border border-gray-300"></div>
                  <div className="w-24 h-32 bg-gray-300 rounded border border-gray-400"></div>
               </div>
            </div>
         </div>
      </section>

      {/* --- PREÇO (Pricing) --- */}
      <section id="preco" className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Planos Flexíveis</h2>
            <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-brand-dark' : 'text-gray-400'}`}>Mensal</span>
                <button 
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative w-16 h-8 bg-brand-purple rounded-full p-1 transition-colors focus:outline-none"
                >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'annual' ? 'translate-x-8' : ''}`}></div>
                </button>
                <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-brand-dark' : 'text-gray-400'}`}>Anual (Melhor Oferta)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             
             {/* Plan 1: Basic */}
             <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
                <div className="p-8 flex-1">
                   <h3 className="text-xl font-bold text-gray-500 mb-2">Wisen Basic</h3>
                   <p className="text-sm text-gray-400 mb-6 h-10">Ideal para quem quer apenas uma funcionalidade específica.</p>
                   
                   <div className="flex items-end gap-1 mb-6">
                      <span className="text-4xl font-extrabold text-brand-dark">R$ {getPrice('basic')}</span>
                      <span className="text-gray-400 mb-1">/mês</span>
                   </div>

                   {billingCycle === 'annual' && (
                       <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded mb-6">
                           Economize {getDiscount('basic')}% no plano anual
                       </div>
                   )}

                   <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                         <Check size={18} className="text-brand-purple mt-0.5" />
                         <span className="text-gray-600 text-sm">Escolha: Apenas Currículo OU Apenas Portfólio</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <Check size={18} className="text-brand-purple mt-0.5" />
                         <span className="text-gray-600 text-sm">Link personalizado</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <Check size={18} className="text-brand-purple mt-0.5" />
                         <span className="text-gray-600 text-sm">Suporte por email</span>
                      </li>
                   </ul>
                </div>
                <div className="p-8 pt-0 mt-auto">
                    <Link to="/login" className="block w-full border-2 border-brand-purple text-brand-purple py-3 rounded-xl font-bold text-center hover:bg-brand-purple hover:text-white transition-all">
                        Selecionar Basic
                    </Link>
                </div>
             </div>

             {/* Plan 2: Pro (Bundle) */}
             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-brand-purple transform md:-translate-y-4 flex flex-col relative">
                <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MAIS POPULAR</div>
                <div className="p-8 flex-1">
                   <h3 className="text-xl font-bold text-brand-purple mb-2">Wisen Pro</h3>
                   <p className="text-sm text-gray-400 mb-6 h-10">O pacote completo para profissionais de alta performance.</p>
                   
                   <div className="flex items-end gap-1 mb-6">
                      <span className="text-5xl font-extrabold text-brand-dark">R$ {getPrice('pro')}</span>
                      <span className="text-gray-400 mb-1">/mês</span>
                   </div>

                   {billingCycle === 'annual' && (
                       <div className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold px-2 py-1 rounded mb-6">
                           Economize {getDiscount('pro')}% no plano anual
                       </div>
                   )}

                   <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                         <Check size={18} className="text-brand-orange mt-0.5" strokeWidth={3} />
                         <span className="text-gray-800 font-medium text-sm">Currículo + Portfólio Completo</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <Check size={18} className="text-brand-orange mt-0.5" strokeWidth={3}/>
                         <span className="text-gray-800 font-medium text-sm">Projetos Ilimitados</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <Check size={18} className="text-brand-orange mt-0.5" strokeWidth={3}/>
                         <span className="text-gray-800 font-medium text-sm">Gráficos de Resultado Avançados</span>
                      </li>
                      <li className="flex items-start gap-3">
                         <Check size={18} className="text-brand-orange mt-0.5" strokeWidth={3}/>
                         <span className="text-gray-800 font-medium text-sm">Prioridade no Suporte</span>
                      </li>
                   </ul>
                </div>
                <div className="p-8 pt-0 mt-auto">
                    <Link to="/login" className="block w-full bg-brand-purple text-white py-4 rounded-xl font-bold text-center hover:bg-[#4a3a7d] transition-all shadow-lg hover:shadow-brand-purple/30">
                        Quero o Completo
                    </Link>
                    <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                        <CreditCard size={12}/> Cancele quando quiser
                    </p>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-brand-dark text-center mb-12">Dúvidas frequentes</h2>
           
           <div className="space-y-4">
              {[
                { q: "Posso cancelar quando quiser?", a: "Sim. Você pode cancelar a assinatura a qualquer momento." },
                { q: "Preciso saber programar?", a: "Não. A plataforma é totalmente visual e simples de usar." },
                { q: "Serve só para social media?", a: "Não. Também funciona para tráfego pago, design, conteúdo, branding e qualquer prestação de serviço que precise de prova." },
                { q: "Posso colocar quantos cases eu quiser?", a: "Sim. No plano Pro, os projetos são ilimitados." },
                { q: "O link é público?", a: "Você escolhe como quer compartilhar. Pode usar o link em propostas, redes sociais ou enviar diretamente para o cliente." },
                { q: "Posso atualizar os resultados depois?", a: "Sim. Você pode editar e atualizar seus cases a qualquer momento." },
              ].map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                   <button 
                     onClick={() => toggleAccordion(idx)}
                     className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition text-left focus:outline-none"
                   >
                      <span className="font-bold text-brand-dark">{item.q}</span>
                      {activeAccordion === idx ? <ChevronUp className="text-brand-purple"/> : <ChevronDown className="text-gray-400"/>}
                   </button>
                   {activeAccordion === idx && (
                     <div className="p-5 bg-gray-50 border-t border-gray-100 text-gray-600">
                        {item.a}
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 bg-brand-dark text-white text-center px-4">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para apresentar seus resultados de forma profissional?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
               Crie seu portfólio agora e tenha um link pronto para enviar em cada nova proposta.
            </p>
            <Link to="/login" className="inline-block bg-brand-orange text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-brand-orange transition-all shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-1">
               Criar meu portfólio agora
            </Link>
         </div>
      </section>

    </div>
  );
};

export default Sales;
