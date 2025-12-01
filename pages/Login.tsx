import React, { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';
    
    const Login: React.FC = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const { login } = useAuth();
      const navigate = useNavigate();
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(email, password);
        if (success) {
          navigate('/admin');
        }
        setLoading(false);
      };
    
      return (
        <div className="min-h-screen bg-brand-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-brand-dark">
              Área do Profissional
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Gerencie seu portfólio e conquiste mais clientes.
            </p>
          </div>
    
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border-t-4 border-brand-purple">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-brand-purple focus:border-brand-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:ring-brand-purple focus:border-brand-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
    
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-brand-purple focus:ring-brand-purple border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Lembrar-me
                    </label>
                  </div>
    
                  <div className="text-sm">
                    <a href="#" className="font-medium text-brand-purple hover:text-brand-dark">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-purple hover:bg-[#4a3a7d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple transition-all disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Entrar na Plataforma'}
                  </button>
                </div>
              </form>
    
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Ainda não tem conta?
                    </span>
                  </div>
                </div>
    
                <div className="mt-6">
                  <Link
                    to="/planos"
                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20 transition-all"
                  >
                    Criar meu Portfólio Wisen <ArrowRight size={16} className="ml-2"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Login;
    