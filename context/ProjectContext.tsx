import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, ProjectType } from '../types';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updatedProject: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleProjectVisibility: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Rebranding TechFlow',
    category: 'Branding',
    description: 'Redesenho completo da identidade visual da startup TechFlow, aumentando o reconhecimento da marca em 40%.',
    type: ProjectType.VISUAL,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    gallery: ['https://picsum.photos/800/600?random=10', 'https://picsum.photos/800/600?random=11'],
    isVisible: true
  },
  {
    id: '2',
    title: 'Campanha Black Friday',
    category: 'Performance',
    description: 'Gestão de tráfego pago resultando em ROAS de 15x durante a semana de ofertas.',
    type: ProjectType.ANALYTICAL,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    charts: [
      {
        id: 'c1',
        title: 'Comparativo de Performance',
        type: 'bar',
        data: [
          { name: 'Meta', value: 120 },
          { name: 'Realizado', value: 185 },
          { name: 'Ano Anterior', value: 90 },
        ]
      },
      {
        id: 'c2',
        title: 'Distribuição de Leads',
        type: 'pie',
        data: [
          { name: 'Instagram', value: 45 },
          { name: 'Google', value: 30 },
          { name: 'Email', value: 25 },
        ]
      }
    ],
    isVisible: true
  },
  {
    id: '3',
    title: 'Lançamento EcoBottle',
    category: 'Social Media',
    description: 'Estratégia de conteúdo orgânico e influenciadores para lançamento de produto sustentável.',
    type: ProjectType.VISUAL,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    gallery: ['https://picsum.photos/800/600?random=12'],
    isVisible: true
  }
];

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects((prev) => prev.map(p => (p.id === id ? { ...p, ...updatedProject } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter(p => p.id !== id));
  };

  const toggleProjectVisibility = (id: string) => {
    setProjects((prev) => prev.map(p => 
      p.id === id ? { ...p, isVisible: !p.isVisible } : p
    ));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, toggleProjectVisibility }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};