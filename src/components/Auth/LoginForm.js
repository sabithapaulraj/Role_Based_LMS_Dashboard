import React, { useState } from 'react';
import users from '../../mockData/users.json';
import '../../styles/loginform.css';

// Simple login form
const LoginForm = ({ role, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.role === role && u.username === username && u.password === password);
    if (user) {
      onLogin(user, role);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginForm;
