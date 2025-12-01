
import React, { useState, useRef } from 'react';
import { useProjects } from '../context/ProjectContext';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { generateProjectDescription } from '../services/geminiService';
import { ProjectType, ChartData, Skill, Education, ProjectChart } from '../types';
import { Wand2, Upload, CheckCircle, Loader2, Plus, Trash2, Layout, User, FileText, Save, LogOut, Eye, EyeOff, Pencil, X, ImagePlus, BarChart3, PieChart } from 'lucide-react';

type Tab = 'projects' | 'profile' | 'resume';

const Admin: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, toggleProjectVisibility } = useProjects();
  const { profile, skills, education, updateProfile, updateSkills, updateEducation } = useProfile();
  const { logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Project Form State
  const [projectData, setProjectData] = useState({
    title: '',
    category: '',
    type: ProjectType.VISUAL,
    description: '',
    imageUrl: '',
  });

  // Gallery State (Drag & Drop)
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Multi-Chart State
  const [chartBlocks, setChartBlocks] = useState<ProjectChart[]>([
    { id: Date.now().toString(), title: '', type: 'bar', data: [{ name: '', value: 0 }] }
  ]);

  // --- Handlers ---

  const resetForm = () => {
    setProjectData({
      title: '',
      category: '',
      type: ProjectType.VISUAL,
      description: '',
      imageUrl: '',
    });
    setGalleryImages([]);
    setChartBlocks([{ id: Date.now().toString(), title: '', type: 'bar', data: [{ name: '', value: 0 }] }]);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditProject = (project: any) => {
    setIsEditing(true);
    setEditingId(project.id);
    setProjectData({
      title: project.title,
      category: project.category,
      type: project.type,
      description: project.description,
      imageUrl: project.imageUrl,
    });
    
    if (project.type === ProjectType.VISUAL && project.gallery) {
      setGalleryImages(project.gallery);
    } else {
      setGalleryImages([]);
    }

    if (project.type === ProjectType.ANALYTICAL && project.charts) {
      setChartBlocks(project.charts);
    } else {
      setChartBlocks([{ id: Date.now().toString(), title: '', type: 'bar', data: [{ name: '', value: 0 }] }]);
    }
    
    // Scroll to top of form
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const newImages = files.map((file: any) => URL.createObjectURL(file));
      setGalleryImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  // Chart Block Handlers
  const handleAddChartBlock = () => {
    setChartBlocks([...chartBlocks, { id: Date.now().toString(), title: '', type: 'bar', data: [{ name: '', value: 0 }] }]);
  };

  const handleRemoveChartBlock = (index: number) => {
     const newBlocks = [...chartBlocks];
     newBlocks.splice(index, 1);
     setChartBlocks(newBlocks);
  };

  const handleChartBlockChange = (index: number, field: keyof ProjectChart, value: any) => {
    const newBlocks = [...chartBlocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setChartBlocks(newBlocks);
  };

  // Chart Data Points Handlers
  const handleAddDataPoint = (chartIndex: number) => {
     const newBlocks = [...chartBlocks];
     newBlocks[chartIndex].data.push({ name: '', value: 0 });
     setChartBlocks(newBlocks);
  };

  const handleRemoveDataPoint = (chartIndex: number, dataIndex: number) => {
    const newBlocks = [...chartBlocks];
    newBlocks[chartIndex].data.splice(dataIndex, 1);
    setChartBlocks(newBlocks);
  };

  const handleDataPointChange = (chartIndex: number, dataIndex: number, field: keyof ChartData, value: string | number) => {
    const newBlocks = [...chartBlocks];
    newBlocks[chartIndex].data[dataIndex] = { ...newBlocks[chartIndex].data[dataIndex], [field]: value };
    setChartBlocks(newBlocks);
  };

  const handleGenerateDescription = async () => {
    if (!projectData.title || !projectData.category) {
      alert("Por favor, preencha o Título e a Categoria para gerar a descrição.");
      return;
    }
    setLoading(true);
    const description = await generateProjectDescription(projectData.title, projectData.category);
    setProjectData(prev => ({ ...prev, description }));
    setLoading(false);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalImageUrl = projectData.imageUrl || `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 100)}`;
    
    let finalGallery: string[] | undefined = undefined;
    let finalCharts: ProjectChart[] | undefined = undefined;

    if (projectData.type === ProjectType.VISUAL) {
        finalGallery = galleryImages;
    } else {
        // Filter out empty charts or data points
        finalCharts = chartBlocks.map(chart => ({
            ...chart,
            data: chart.data.filter(d => d.name && d.value > 0)
        })).filter(c => c.title && c.data.length > 0);
    }

    const payload = {
      title: projectData.title,
      category: projectData.category,
      description: projectData.description,
      type: projectData.type,
      imageUrl: finalImageUrl,
      gallery: finalGallery,
      charts: finalCharts,
    };

    if (isEditing && editingId) {
        updateProject(editingId, payload);
        setSuccessMsg('Projeto atualizado com sucesso!');
    } else {
        addProject({
            id: Date.now().toString(),
            isVisible: true,
            ...payload
        });
        setSuccessMsg('Projeto adicionado com sucesso!');
    }

    resetForm();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Profile Handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateProfile({ [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Enforce +55 logic if user starts typing digits
    if (value.length > 0 && !value.startsWith('55')) {
      value = '55' + value;
    }

    // Apply Mask
    if (value.length > 13) value = value.slice(0, 13); // Limit length
    
    // +55 (XX) XXXXX-XXXX
    if (value.length > 2) {
       value = `+${value.slice(0, 2)} (${value.slice(2)}`;
    }
    if (value.length > 7) {
       value = `${value.slice(0, 7)}) ${value.slice(7)}`;
    }
    if (value.length > 13) {
       value = `${value.slice(0, 13)}-${value.slice(13)}`;
    }

    // Update state directly for phone
    updateProfile({ phone: value });
  };

  // Skills Handlers
  const handleSkillChange = (id: string, field: keyof Skill, value: string | number | boolean) => {
    const updatedSkills = skills.map(s => s.id === id ? { ...s, [field]: value } : s);
    updateSkills(updatedSkills);
  };
  const handleAddSkill = () => updateSkills([...skills, { id: Date.now().toString(), name: '', level: 50, isVisible: true }]);
  const handleDeleteSkill = (id: string) => updateSkills(skills.filter(s => s.id !== id));
  const toggleSkillVisibility = (id: string) => {
    const skill = skills.find(s => s.id === id);
    if(skill) handleSkillChange(id, 'isVisible', !skill.isVisible);
  };

  // Education Handlers
  const handleEduChange = (id: string, field: keyof Education, value: string | boolean) => {
     const updatedEdu = education.map(e => e.id === id ? { ...e, [field]: value } : e);
     updateEducation(updatedEdu);
  };
  const handleAddEdu = () => updateEducation([...education, { id: Date.now().toString(), institution: '', degree: '', year: '', isVisible: true }]);
  const handleDeleteEdu = (id: string) => updateEducation(education.filter(e => e.id !== id));
  const toggleEduVisibility = (id: string) => {
    const edu = education.find(e => e.id === id);
    if(edu) handleEduChange(id, 'isVisible', !edu.isVisible);
  };

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4 sm:px-6 lg:px-8">
      <div ref={scrollRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-brand-dark py-6 px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Painel do Profissional</h1>
            <p className="text-gray-400 text-xs mt-1">Bem-vindo, {profile.name}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-brand-purple/20 px-3 py-1 rounded text-xs text-white font-mono border border-brand-purple/30">PRO</div>
             <button onClick={logout} className="text-white/80 hover:text-red-400 transition" title="Sair">
                <LogOut size={20} />
             </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
           <button 
             onClick={() => setActiveTab('projects')}
             className={`flex-1 py-4 text-center font-medium text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'projects' ? 'text-brand-purple border-b-2 border-brand-purple bg-brand-purple/5' : 'text-gray-500 hover:text-brand-purple hover:bg-gray-50'}`}
           >
             <Layout size={18} /> Projetos
           </button>
           <button 
             onClick={() => setActiveTab('profile')}
             className={`flex-1 py-4 text-center font-medium text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'profile' ? 'text-brand-purple border-b-2 border-brand-purple bg-brand-purple/5' : 'text-gray-500 hover:text-brand-purple hover:bg-gray-50'}`}
           >
             <User size={18} /> Perfil
           </button>
           <button 
             onClick={() => setActiveTab('resume')}
             className={`flex-1 py-4 text-center font-medium text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'resume' ? 'text-brand-purple border-b-2 border-brand-purple bg-brand-purple/5' : 'text-gray-500 hover:text-brand-purple hover:bg-gray-50'}`}
           >
             <FileText size={18} /> Currículo
           </button>
        </div>

        <div className="p-8">
            {successMsg && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 flex items-center gap-2 text-green-700 animate-pulse">
                <CheckCircle size={20} />
                {successMsg}
                </div>
            )}

            {/* --- PROJECT TAB --- */}
            {activeTab === 'projects' && (
                <div className="space-y-12">
                    {/* ADD/EDIT PROJECT FORM */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="text-lg font-bold text-brand-dark">
                                {isEditing ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
                            </h3>
                            {isEditing && (
                                <button onClick={resetForm} className="text-sm text-red-500 hover:underline flex items-center gap-1">
                                    <X size={14} /> Cancelar Edição
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleProjectSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={projectData.title}
                                    onChange={handleProjectChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent transition"
                                />
                                </div>
                                
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                <input
                                    type="text"
                                    name="category"
                                    required
                                    value={projectData.category}
                                    onChange={handleProjectChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent transition"
                                />
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Projeto</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value={ProjectType.VISUAL}
                                            checked={projectData.type === ProjectType.VISUAL}
                                            onChange={handleProjectChange}
                                            className="text-brand-purple focus:ring-brand-purple"
                                        />
                                        <span className="text-gray-700">Visual (Imagens)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value={ProjectType.ANALYTICAL}
                                            checked={projectData.type === ProjectType.ANALYTICAL}
                                            onChange={handleProjectChange}
                                            className="text-brand-purple focus:ring-brand-purple"
                                        />
                                        <span className="text-gray-700">Analítico (Resultados/Gráficos)</span>
                                    </label>
                                </div>
                            </div>

                            {/* --- VISUAL TYPE: DRAG & DROP --- */}
                            {projectData.type === ProjectType.VISUAL && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Galeria de Imagens</label>
                                    
                                    {/* Drop Zone */}
                                    <div 
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${isDragging ? 'border-brand-purple bg-brand-purple/5' : 'border-gray-300 hover:border-brand-purple'}`}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                                            <ImagePlus size={32} />
                                            <p className="font-medium">Arraste e solte suas fotos aqui</p>
                                            <p className="text-xs">ou clique para selecionar (simulado no navegador)</p>
                                        </div>
                                        {/* Hidden input for click selection - simplified as simulation */}
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                                            onChange={(e) => {
                                                if(e.target.files && e.target.files.length > 0) {
                                                    const newImages = Array.from(e.target.files).map((f: any) => URL.createObjectURL(f as any));
                                                    setGalleryImages(prev => [...prev, ...newImages]);
                                                }
                                            }}
                                            // Make sure the input covers the div area properly in relative context
                                            style={{ display: 'none' }} // Actually let's use a label trigger if needed, but drop is main req
                                        />
                                    </div>

                                    {/* Preview Grid */}
                                    {galleryImages.length > 0 && (
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
                                            {galleryImages.map((img, idx) => (
                                                <div key={idx} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleRemoveImage(idx)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* --- ANALYTICAL TYPE: MULTI-CHART --- */}
                            {projectData.type === ProjectType.ANALYTICAL && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-sm font-bold text-gray-700">Gráficos de Resultados</label>
                                        <button 
                                            type="button" 
                                            onClick={handleAddChartBlock}
                                            className="text-sm bg-brand-purple text-white px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-[#4a3a7d]"
                                        >
                                            <BarChart3 size={14} /> Adicionar Gráfico
                                        </button>
                                    </div>

                                    {chartBlocks.map((chart, cIdx) => (
                                        <div key={chart.id || cIdx} className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative">
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveChartBlock(cIdx)}
                                                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1"
                                                title="Remover Gráfico"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                                                <div>
                                                    <label className="text-xs text-gray-500 block mb-1">Título do Gráfico</label>
                                                    <input 
                                                        type="text"
                                                        value={chart.title}
                                                        onChange={(e) => handleChartBlockChange(cIdx, 'title', e.target.value)}
                                                        placeholder="Ex: Crescimento ROI"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-gray-500 block mb-1">Tipo de Visualização</label>
                                                    <select 
                                                        value={chart.type}
                                                        onChange={(e) => handleChartBlockChange(cIdx, 'type', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                                                    >
                                                        <option value="bar">Barras (Comparativo)</option>
                                                        <option value="pie">Pizza (Distribuição)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="bg-white p-3 rounded-lg border border-gray-100">
                                                <label className="text-xs font-bold text-gray-400 block mb-2">MÉTRICAS DO GRÁFICO</label>
                                                {chart.data.map((item, dIdx) => (
                                                    <div key={dIdx} className="flex gap-2 mb-2 items-center">
                                                        <input 
                                                            type="text"
                                                            placeholder="Nome (Ex: Google Ads)"
                                                            value={item.name}
                                                            onChange={(e) => handleDataPointChange(cIdx, dIdx, 'name', e.target.value)}
                                                            className="flex-1 px-3 py-1 border border-gray-200 rounded text-sm"
                                                        />
                                                        <input 
                                                            type="number"
                                                            placeholder="Valor"
                                                            value={item.value}
                                                            onChange={(e) => handleDataPointChange(cIdx, dIdx, 'value', Number(e.target.value))}
                                                            className="w-24 px-3 py-1 border border-gray-200 rounded text-sm"
                                                        />
                                                        <button 
                                                            type="button" 
                                                            onClick={() => handleRemoveDataPoint(cIdx, dIdx)}
                                                            className="p-1 text-gray-400 hover:text-red-500"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleAddDataPoint(cIdx)}
                                                    className="text-xs text-brand-purple font-medium flex items-center gap-1 mt-2 hover:underline"
                                                >
                                                    <Plus size={12} /> Adicionar Métrica
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Common Description & Cover */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                                <button 
                                    type="button" 
                                    onClick={handleGenerateDescription}
                                    disabled={loading}
                                    className="text-xs flex items-center gap-1 text-brand-purple hover:text-brand-orange font-medium disabled:opacity-50"
                                >
                                    {loading ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                                    Gerar com IA (Gemini)
                                </button>
                                </div>
                                <textarea
                                name="description"
                                required
                                rows={4}
                                value={projectData.description}
                                onChange={handleProjectChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent transition"
                                placeholder="Descreva os objetivos e resultados do projeto..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem de Capa</label>
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        value={projectData.imageUrl}
                                        onChange={handleProjectChange}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent transition"
                                        placeholder="https://..."
                                    />
                                    <div className="flex items-center justify-center w-10 bg-gray-100 rounded-lg text-gray-400">
                                        <Upload size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <button
                                type="submit"
                                className={`w-full text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg flex items-center justify-center gap-2 ${isEditing ? 'bg-brand-orange hover:bg-orange-600' : 'bg-brand-purple hover:bg-[#4a3a7d]'}`}
                                >
                                <Save size={18} /> {isEditing ? 'Atualizar Projeto' : 'Publicar Projeto'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* MANAGE EXISTING PROJECTS */}
                    <div className="pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-bold text-brand-dark mb-4">Gerenciar Projetos Existentes</h3>
                        {projects.length === 0 ? (
                            <p className="text-gray-500 italic">Nenhum projeto cadastrado.</p>
                        ) : (
                            <div className="space-y-3">
                                {projects.map(p => (
                                    <div key={p.id} className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${p.isVisible ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <img src={p.imageUrl} className="w-10 h-10 rounded object-cover" alt="mini" />
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{p.title}</p>
                                                <p className="text-xs text-gray-500">{p.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleEditProject(p)}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                                                title="Editar Informações"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button 
                                                onClick={() => toggleProjectVisibility(p.id)}
                                                className={`p-2 rounded ${p.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                                                title={p.isVisible ? "Visível (Clique para ocultar)" : "Oculto (Clique para mostrar)"}
                                            >
                                                {p.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                            <button 
                                                onClick={() => deleteProject(p.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                title="Excluir projeto"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- PROFILE TAB --- */}
            {activeTab === 'profile' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Título</label>
                            <input
                                type="text"
                                name="role"
                                value={profile.role}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Quem Somos)</label>
                        <textarea
                            name="bio"
                            rows={6}
                            value={profile.bio}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handlePhoneChange}
                                placeholder="+55 (XX) XXXXX-XXXX"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                            />
                            <p className="text-xs text-gray-400 mt-1">Formato: +55 (DD) 90000-0000</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail de Contato</label>
                            <input
                                type="text"
                                name="email"
                                value={profile.email}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                            />
                        </div>
                    </div>
                     <div className="flex justify-end pt-4">
                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center gap-2">
                            <Save size={18} /> Salvar Alterações
                        </button>
                    </div>
                </div>
            )}

            {/* --- RESUME TAB --- */}
            {activeTab === 'resume' && (
                <div className="space-y-10">
                    {/* Skills Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-brand-dark">Competências (Gráfico)</h3>
                            <button onClick={handleAddSkill} className="text-xs bg-brand-purple/10 text-brand-purple px-3 py-1 rounded hover:bg-brand-purple/20 font-medium flex items-center gap-1">
                                <Plus size={14} /> Adicionar
                            </button>
                        </div>
                        <div className="space-y-3">
                            {skills.map((skill) => (
                                <div key={skill.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-transparent hover:border-gray-200">
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 block">Competência</label>
                                        <input 
                                            type="text" 
                                            value={skill.name}
                                            onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                                            className="w-full bg-transparent border-b border-gray-300 focus:border-brand-purple outline-none py-1"
                                        />
                                    </div>
                                    <div className="w-24">
                                        <label className="text-xs text-gray-500 block">Nível (0-100)</label>
                                        <input 
                                            type="number" 
                                            value={skill.level}
                                            onChange={(e) => handleSkillChange(skill.id, 'level', Number(e.target.value))}
                                            className="w-full bg-transparent border-b border-gray-300 focus:border-brand-purple outline-none py-1"
                                        />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={() => toggleSkillVisibility(skill.id)} 
                                            className={`p-2 rounded ${skill.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                                            title="Alternar visibilidade"
                                        >
                                            {skill.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                        <button onClick={() => handleDeleteSkill(skill.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-gray-200"></div>

                    {/* Education Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-brand-dark">Formação Acadêmica</h3>
                            <button onClick={handleAddEdu} className="text-xs bg-brand-purple/10 text-brand-purple px-3 py-1 rounded hover:bg-brand-purple/20 font-medium flex items-center gap-1">
                                <Plus size={14} /> Adicionar
                            </button>
                        </div>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg relative group border border-transparent hover:border-gray-200">
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button 
                                            onClick={() => toggleEduVisibility(edu.id)} 
                                            className={`p-1.5 rounded ${edu.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                                            title="Alternar visibilidade"
                                        >
                                            {edu.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                        <button onClick={() => handleDeleteEdu(edu.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label className="text-xs text-gray-500 block">Curso / Grau</label>
                                            <input 
                                                type="text" 
                                                value={edu.degree}
                                                onChange={(e) => handleEduChange(edu.id, 'degree', e.target.value)}
                                                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-purple outline-none py-1 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">Instituição</label>
                                            <input 
                                                type="text" 
                                                value={edu.institution}
                                                onChange={(e) => handleEduChange(edu.id, 'institution', e.target.value)}
                                                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-purple outline-none py-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">Ano</label>
                                            <input 
                                                type="text" 
                                                value={edu.year}
                                                onChange={(e) => handleEduChange(edu.id, 'year', e.target.value)}
                                                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-purple outline-none py-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
