import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import RoleSelectionPage from './pages/quiz/RoleSelectionPage';
import QuizPage from './pages/quiz/QuizPage';
import QuizResultPage from './pages/quiz/QuizResultPage';
import SkillGapsPage from './pages/skills/SkillGapsPage';
import LearningPlanPage from './pages/learning/LearningPlanPage';
import ProfilePage from './pages/learning/ProfilePage';

/**
 * Root route redirector based on authentication status.
 */
const RootRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

/**
 * Application router configuration.
 */
export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Application Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute>
                <RoleSelectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:roleId"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:attemptId/result"
            element={
              <ProtectedRoute>
                <QuizResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills/gaps"
            element={
              <ProtectedRoute>
                <SkillGapsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning-plan"
            element={
              <ProtectedRoute>
                <LearningPlanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
