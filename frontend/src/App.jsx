import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

import useAuth from './hooks/useAuth';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyOTP from './pages/auth/VerifyOTP';
import ScriptWriter from './pages/ai/ScriptWriter';
import ScriptAnalyzer from './pages/ai/ScriptAnalyzer';
import Dashboard from './pages/creator/Dashboard';
import VideoUploader from './pages/creator/VideoUploader';
import AIVisualization from './pages/ai/AIVisualization';
import Watch from './pages/Watch';
import Profile from './pages/profile/Profile';
import Splash from './components/ui/Splash';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      <Router>
        {showSplash ? (
          <Splash onFinish={() => setShowSplash(false)} />
        ) : (
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/ai-writer" element={
              <ProtectedRoute>
                <ScriptWriter />
              </ProtectedRoute>
            } />

            <Route path="/ai-analyzer" element={
              <ProtectedRoute>
                <ScriptAnalyzer />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/upload" element={
              <ProtectedRoute>
                <VideoUploader />
              </ProtectedRoute>
            } />

            <Route path="/ai-visual" element={
              <ProtectedRoute>
                <AIVisualization />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
