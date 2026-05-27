import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';

// Organizer pages
import LoginPage from './pages/organizer/LoginPage';
import RegisterPage from './pages/organizer/RegisterPage';
import DashboardPage from './pages/organizer/DashboardPage';
import BuilderPage from './pages/organizer/BuilderPage';
import LobbyPage from './pages/organizer/LobbyPage';
import HistoryPage from './pages/organizer/HistoryPage';
import OrganizerResultsPage from './pages/organizer/OrganizerResultsPage';
import SettingsPage from './pages/organizer/SettingsPage';

// Participant pages
import HomePage from './pages/participant/HomePage';
import JoinPage from './pages/participant/JoinPage';
import QuestionScreen from './pages/participant/QuestionScreen';
import ParticipantResultsPage from './pages/participant/ParticipantResultsPage';

// /results/:pin — organizer view if authenticated, participant view otherwise
function ResultsRouter() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <OrganizerResultsPage /> : <ParticipantResultsPage />;
}

// Layout that provides socket context only for session-related routes
function SocketLayout() {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public routes (no socket needed) ── */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ── Organizer protected routes (no socket needed) ── */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/builder/:id" element={<BuilderPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* ── Results — no socket needed ── */}
          <Route path="/results/:pin" element={<ResultsRouter />} />

          {/* ── Session routes (socket needed) ── */}
          <Route element={<SocketLayout />}>
            <Route path="/join" element={<JoinPage />} />
            <Route path="/play/:pin" element={<QuestionScreen />} />
            <Route element={<PrivateRoute />}>
              <Route path="/lobby/:pin" element={<LobbyPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}
