import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
// import { hasPermission } from './context/RBACConfig';
import RoleSelect from './components/Auth/RoleSelect';
import LoginForm from './components/Auth/LoginForm';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import ChatbotModal from './components/Chatbot/ChatbotModal';
import NotFound from './components/NotFound';
import './styles/main.css';
import './styles/dashboard.css';
import './styles/chatbot.css';

// Floating chatbot button with icon and label
const ChatbotButton = ({ onClick }) => (
  <button className="chatbot-float-btn" onClick={onClick} aria-label="Open chatbot">
    <span className="chatbot-icon" role="img" aria-label="Chat icon">💬</span>
    <span className="chatbot-label">Chatbot</span>
  </button>
);

// Helper component for redirecting to home
const NavigateToHome = () => <Navigate to="/" replace />;

// Wrapper for LoginForm to get role from route
import { useParams } from 'react-router-dom';
const LoginFormWrapper = ({ login, navigate }) => {
  const { role } = useParams();
  // On successful login, redirect to dashboard
  const handleLogin = (user, role) => {
    login(user, role);
    if (role === 'admin') navigate('/admin');
    else if (role === 'student') navigate('/student');
  };
  return <LoginForm role={role} onLogin={handleLogin} />;
};

// Main app content with routing
const AppContent = () => {
  const { user, role, login, logout } = useContext(AuthContext);
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Back button logic
  const handleBack = () => {
    navigate(-1);
  };

  // Only show chatbot on dashboard pages
  const showChatbotUI = location.pathname === '/admin' || location.pathname === '/student';

  // Show back button only on login page
  const showBackBtn = location.pathname.startsWith('/login');
  return (
    <div className="app-container">
      {showBackBtn && (
        <button className="back-btn" onClick={handleBack}>← Back</button>
      )}
      <Routes>
        <Route path="/" element={<RoleSelect onSelect={role => navigate(`/login/${role}`)} />} />
        <Route path="/login/:role" element={<LoginFormWrapper login={login} navigate={navigate} />} />
        <Route path="/admin" element={user && role === 'admin' ? <AdminDashboard /> : <NavigateToHome />} />
        <Route path="/student" element={user && role === 'student' ? <StudentDashboard /> : <NavigateToHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {user && showChatbotUI && (
        <header className="main-header">
          <div className="header-content">
            <h1 className="header-title">LMS Dashboard</h1>
            <div className="header-user">
              <span>Logged in as: <b>{user.username}</b> ({role})</span>
              <button className="header-logout" onClick={logout}>Logout</button>
            </div>
          </div>
        </header>
      )}
      {showChatbotUI && <ChatbotButton onClick={() => setShowChatbot(true)} />}
      {showChatbotUI && showChatbot && <ChatbotModal onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

// App wrapper with context and router
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
