
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { ProjectType } from '../types';
import { ArrowLeft, BarChart3, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

const COLORS = ['#5A4797', '#F37712', '#BD606C', '#676363'];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-400">Projeto não encontrado</h2>
        <button onClick={() => navigate('/portfolio')} className="text-brand-purple hover:underline">
          Voltar ao Portfólio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      {/* Header Image */}
      <div className="h-[40vh] w-full relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-5xl w-full px-6">
                 <Link to="/portfolio" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Voltar
                 </Link>
                 <div className="flex items-center gap-3 mb-4">
                    <span className="bg-brand-orange px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                        {project.category}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        {project.type === ProjectType.ANALYTICAL ? <BarChart3 size={14}/> : <ImageIcon size={14}/>}
                        {project.type}
                    </span>
                 </div>
                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Description Section */}
            <div className="mb-12 border-b border-gray-100 pb-12">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">Sobre o Projeto</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {project.description}
                </p>
            </div>

            {/* Content Based on Type */}
            {project.type === ProjectType.VISUAL && (
                <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-8 flex items-center gap-2">
                        <ImageIcon className="text-brand-purple" /> Galeria do Projeto
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.gallery && project.gallery.length > 0 ? (
                            project.gallery.map((img, idx) => (
                                <div key={idx} className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${idx === 0 && project.gallery && project.gallery.length % 2 !== 0 ? 'md:col-span-2' : ''}`}>
                                    <img 
                                        src={img} 
                                        alt={`Galeria ${idx}`} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">Nenhuma imagem adicional disponível na galeria.</p>
                        )}
                    </div>
                </div>
            )}

            {project.type === ProjectType.ANALYTICAL && (
                <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-8 flex items-center gap-2">
                        <BarChart3 className="text-brand-purple" /> Resultados e Métricas
                    </h3>
                    
                    {/* KPI Highlighters (Simulated for now based on first chart data if available) */}
                    {project.charts && project.charts.length > 0 && project.charts[0].data.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                          {project.charts[0].data.slice(0, 3).map((item, i) => (
                            <div key={i} className="bg-brand-bg p-6 rounded-xl border border-gray-100">
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">{item.name}</p>
                                <h4 className="text-3xl font-bold text-brand-purple">{item.value}</h4>
                                <div className="text-green-600 text-xs font-bold mt-2 flex items-center gap-1">
                                    <CheckCircle2 size={12}/> Resultado Verificado
                                </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Dynamic Charts Rendering */}
                    <div className="space-y-12">
                      {project.charts?.map((chart) => (
                        <div key={chart.id} className="bg-white p-6 rounded-xl shadow-inner border border-gray-100 h-[400px]">
                            <h4 className="text-center text-gray-500 font-semibold mb-6">{chart.title}</h4>
                            <ResponsiveContainer width="100%" height="85%">
                                {chart.type === 'pie' ? (
                                   <PieChart>
                                      <Pie
                                          data={chart.data}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={60}
                                          outerRadius={80}
                                          paddingAngle={5}
                                          dataKey="value"
                                      >
                                          {chart.data.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                      </Pie>
                                      <Tooltip />
                                      <Legend verticalAlign="bottom" height={36}/>
                                  </PieChart>
                                ) : (
                                  <BarChart data={chart.data}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                      <XAxis dataKey="name" tick={{fill: '#888', fontSize: 12}} axisLine={false} tickLine={false} />
                                      <YAxis tick={{fill: '#888', fontSize: 12}} axisLine={false} tickLine={false} />
                                      <Tooltip 
                                          cursor={{fill: 'transparent'}}
                                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                                      />
                                      <Bar dataKey="value" fill="#5A4797" radius={[4, 4, 0, 0]} barSize={40}>
                                          {chart.data.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                      </Bar>
                                  </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                      ))}
                    </div>

                    {(!project.charts || project.charts.length === 0) && (
                        <p className="text-center text-gray-400">Nenhum gráfico disponível para este projeto.</p>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;