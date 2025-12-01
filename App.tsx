import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Sales from './pages/Sales';
import { ProjectProvider } from './context/ProjectContext';
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ProjectProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen bg-brand-bg font-sans">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/planos" element={<Sales />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Admin Route */}
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </ProjectProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;