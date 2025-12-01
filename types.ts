export enum ProjectType {
  VISUAL = 'Visual',
  ANALYTICAL = 'Analítico'
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ProjectChart {
  id: string;
  title: string;
  type: 'bar' | 'pie';
  data: ChartData[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  type: ProjectType;
  imageUrl: string;
  charts?: ProjectChart[]; // Replaces single 'results'
  gallery?: string[]; 
  isVisible: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  isVisible: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  isVisible: boolean;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  phone: string;
  email: string;
  linkedin?: string;
}