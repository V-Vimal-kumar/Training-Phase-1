import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import NotFound from './pages/NotFound';

// Components
import RequireAuth from './components/auth/RequireAuth';

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/" /> : <Register />
        } />
        
        {/* Protected routes */}
        <Route path="/" element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }>
          <Route index element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;