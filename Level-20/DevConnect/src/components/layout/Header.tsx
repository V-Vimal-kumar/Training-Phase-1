import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold text-blue-600">DevConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="w-5 h-5" />
            </Link>
            <Link to="#" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Bell className="w-5 h-5" />
            </Link>
            {user && (
              <div className="relative group">
                <button className="flex items-center space-x-1 p-2 text-gray-700 hover:text-blue-600">
                  <span className="font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                  <Link 
                    to={`/profile/${user._id}`} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/profile/edit" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t py-2 px-4">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-2" />
              <span>Home</span>
            </Link>
            {user && (
              <>
                <Link 
                  to={`/profile/${user._id}`} 
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  <span>My Profile</span>
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded w-full"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;