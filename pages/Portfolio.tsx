import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { Link } from 'react-router-dom';
import { Folder, PieChart, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { ProjectType } from '../types';

const Portfolio: React.FC = () => {
  const { projects } = useProjects();
  
  // Only show visible projects
  const visibleProjects = projects.filter(p => p.isVisible);

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Portfólio de Projetos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma coleção de cases selecionados demonstrando competências visuais e analíticas.
          </p>
        </div>

        {visibleProjects.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
             <p className="text-lg">Nenhum projeto público disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project) => (
              <Link to={`/project/${project.id}`} key={project.id} className="block">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  {/* Card Header / Folder Tab Look */}
                  <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500">
                          <Folder size={18} className="fill-brand-orange/20 text-brand-orange" />
                          <span className="text-xs font-bold tracking-wider uppercase">{project.category}</span>
                      </div>
                      {project.type === ProjectType.ANALYTICAL ? (
                      <PieChart size={18} className="text-brand-purple" title="Projeto Analítico" />
                      ) : (
                      <ImageIcon size={18} className="text-brand-rose" title="Projeto Visual" />
                      )}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                      <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold border-2 border-white px-4 py-2 rounded-full">Ver Detalhes</span>
                      </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                      <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-purple transition-colors">
                      {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                      </p>
                      
                      {/* Visual indicator of contents */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                      {project.type === ProjectType.ANALYTICAL && (
                          <div className="flex items-center gap-1 text-xs text-brand-purple font-medium">
                              <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                              {project.charts ? `${project.charts.length} Gráficos` : 'Gráficos de Resultado'}
                          </div>
                      )}
                      {project.type === ProjectType.VISUAL && (
                          <div className="flex items-center gap-1 text-xs text-brand-rose font-medium">
                              <div className="w-2 h-2 rounded-full bg-brand-rose"></div>
                              {project.gallery ? `${project.gallery.length} Imagens` : 'Galeria de Imagens'}
                          </div>
                      )}
                      <div className="ml-auto">
                          <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                      </div>
                      </div>
                  </div>
                  </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;