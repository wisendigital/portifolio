import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, Skill, Education } from '../types';

interface ProfileContextType {
  profile: Profile;
  skills: Skill[];
  education: Education[];
  updateProfile: (data: Partial<Profile>) => void;
  updateSkills: (skills: Skill[]) => void;
  updateEducation: (edu: Education[]) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialProfile: Profile = {
  name: 'Ana Silva',
  role: 'Especialista em Marketing Digital & Growth Hacking',
  bio: `Com mais de 5 anos de experiência no mercado digital, atuo na intersecção entre criatividade e análise de dados. 
Minha missão é ajudar empresas a encontrarem sua voz única no ruído digital e converterem essa atenção em crescimento sustentável.

Acredito que o marketing moderno não é apenas sobre vender, mas sobre contar histórias que ressoam e criar experiências que fidelizam.`,
  phone: '+55 17 98821-1306',
  email: 'paulo@growthboost.com.br'
};

const initialSkills: Skill[] = [
  { id: '1', name: 'SEO & SEM', level: 90, isVisible: true },
  { id: '2', name: 'Branding', level: 85, isVisible: true },
  { id: '3', name: 'Data Analytics', level: 95, isVisible: true },
  { id: '4', name: 'Social Media', level: 80, isVisible: true },
  { id: '5', name: 'Paid Traffic', level: 88, isVisible: true },
];

const initialEducation: Education[] = [
  {
    id: '1',
    institution: 'ESPM',
    degree: 'MBA em Marketing Digital',
    year: '2021 - 2022',
    isVisible: true
  },
  {
    id: '2',
    institution: 'Universidade de São Paulo',
    degree: 'Bacharelado em Publicidade',
    year: '2016 - 2020',
    isVisible: true
  },
  {
    id: '3',
    institution: 'Google Academy',
    degree: 'Certificação Google Ads & Analytics',
    year: '2023',
    isVisible: true
  }
];

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [education, setEducation] = useState<Education[]>(initialEducation);

  const updateProfile = (data: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const updateSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
  };

  const updateEducation = (newEdu: Education[]) => {
    setEducation(newEdu);
  };

  return (
    <ProfileContext.Provider value={{ profile, skills, education, updateProfile, updateSkills, updateEducation }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};