import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from './contexts/AppDataContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Auth Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

// User Pages
import UserDashboard from './pages/UserDashboard';
import MeetupDetailsEnhanced from './pages/MeetupDetailsEnhanced';
import RegisteredMembersEnhanced from './pages/RegisteredMembersEnhanced';
import LiveAttendeeEnhanced from './pages/LiveAttendeeEnhanced';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import CreateMeetupEnhanced from './pages/CreateMeetupEnhanced';
import AnalyticsEnhanced from './pages/AnalyticsEnhanced';
import HistoryEnhanced from './pages/HistoryEnhanced';

function App() {
  return (
    <Router>
      <AppDataProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Public Home - Redirect based on auth */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/user" replace />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute requiredRole="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="meetup/:id" element={<MeetupDetailsEnhanced />} />
            <Route path="meetup/:id/members" element={<RegisteredMembersEnhanced />} />
            <Route path="meetup/:id/live" element={<LiveAttendeeEnhanced />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="create" element={<CreateMeetupEnhanced />} />
            <Route path="analytics" element={<AnalyticsEnhanced />} />
            <Route path="history" element={<HistoryEnhanced />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppDataProvider>
    </Router>
  );
}

export default App;
