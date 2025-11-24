import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Onboarding
import OnboardingWorkspacePage from './pages/OnboardingWorkspacePage';
import OnboardingPlanPage from './pages/OnboardingPlanPage';

// App Pages
import AppIndexPage from './pages/AppIndexPage';
import DashboardAdminPage from './pages/DashboardAdminPage';
import ProfessionalsPage from './pages/ProfessionalsPage';
import ServicesPage from './pages/ServicesPage';
import AppointmentsPage from './pages/AppointmentsPage';
import BillingPage from './pages/BillingPage';
import SettingsPage from './pages/SettingsPage';
import ExplorePage from './pages/ExplorePage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <WorkspaceProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Onboarding Routes */}
                <Route
                  path="/onboarding/workspace"
                  element={
                    <ProtectedRoute roles={['owner']}>
                      <OnboardingWorkspacePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/plan"
                  element={
                    <ProtectedRoute roles={['owner']}>
                      <OnboardingPlanPage />
                    </ProtectedRoute>
                  }
                />

                {/* App Routes */}
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppIndexPage />
                    </ProtectedRoute>
                  }
                />

                {/* Owner/Professional Routes */}
                <Route
                  path="/app/:workspaceId/dashboard"
                  element={
                    <ProtectedRoute roles={['owner', 'professional']}>
                      <DashboardAdminPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/:workspaceId/professionals"
                  element={
                    <ProtectedRoute roles={['owner']}>
                      <ProfessionalsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/:workspaceId/services"
                  element={
                    <ProtectedRoute roles={['owner']}>
                      <ServicesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/:workspaceId/appointments"
                  element={
                    <ProtectedRoute roles={['owner', 'professional']}>
                      <AppointmentsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/:workspaceId/billing"
                  element={
                    <ProtectedRoute roles={['owner']}>
                      <BillingPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/:workspaceId/settings"
                  element={
                    <ProtectedRoute roles={['owner']}>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Client Routes */}
                <Route
                  path="/app/explore"
                  element={
                    <ProtectedRoute roles={['client']}>
                      <ExplorePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/my-appointments"
                  element={
                    <ProtectedRoute roles={['client']}>
                      <MyAppointmentsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </WorkspaceProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
