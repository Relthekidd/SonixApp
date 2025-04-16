// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import AuthGuard from './components/shared/AuthGuard';
import LoadingScreen from './components/shared/LoadingScreen';
import MusicPlayer from './components/shared/MusicPlayer';
import NotFound from './pages/shared/NotFound';

import { useAuth } from './contexts/AuthProvider';

// Auth Pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Welcome from './pages/auth/Welcome';

// Main Pages
import Explore from './pages/Explore';
import Feed from './pages/listener/Feed';
import Library from './pages/listener/Library';
import LikedSongs from './pages/listener/LikedSongs';
import Playlist from './pages/listener/Playlist';
import Upload from './pages/artist/Upload';
import Dashboard from './pages/artist/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Profile from './pages/shared/Profile';
import Settings from './pages/shared/Settings';
import Subscriptions from './pages/shared/Subscriptions';
import Notifications from './pages/artist/Notifications';
import Merchandise from './pages/artist/Merchandise';
import TrackDetail from './pages/shared/TrackDetail';

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Redirect logged-in users from auth pages to /explore
  useEffect(() => {
    const isOnAuthPage = ['/', '/welcome', '/login', '/signup'].includes(location.pathname);
    if (user && isOnAuthPage) {
      window.history.replaceState(null, '', '/explore');
    }
  }, [user, location.pathname]);

  if (loading) return <LoadingScreen />;

  const isAuthPage = ['/welcome', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        {/* Smart root redirect */}
        <Route
          path="/"
          element={user ? <Navigate to="/explore" replace /> : <Navigate to="/welcome" replace />}
        />

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route
            path="/explore"
            element={
              <AuthGuard>
                <Explore />
              </AuthGuard>
            }
          />
          <Route
            path="/feed"
            element={
              <AuthGuard>
                <Feed />
              </AuthGuard>
            }
          />
          <Route
            path="/library"
            element={
              <AuthGuard>
                <Library />
              </AuthGuard>
            }
          />
          <Route
            path="/liked"
            element={
              <AuthGuard>
                <LikedSongs />
              </AuthGuard>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <AuthGuard>
                <Playlist />
              </AuthGuard>
            }
          />
          <Route
            path="/upload"
            element={
              <AuthGuard>
                <Upload />
              </AuthGuard>
            }
          />
          <Route
            path="/artist/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AuthGuard requiredRole="admin">
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/track/:id"
            element={
              <AuthGuard>
                <TrackDetail />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthGuard>
                <Settings />
              </AuthGuard>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AuthGuard>
                <Subscriptions />
              </AuthGuard>
            }
          />
          <Route
            path="/notifications"
            element={
              <AuthGuard>
                <Notifications />
              </AuthGuard>
            }
          />
          <Route
            path="/merchandise"
            element={
              <AuthGuard>
                <Merchandise />
              </AuthGuard>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Persistent Player */}
      {user && !isAuthPage && <MusicPlayer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
