import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Reading Nook</span>
        </div>
        
        <nav className="nav">
          <div className="user-info">
            <span className="user-name">{user?.username}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
