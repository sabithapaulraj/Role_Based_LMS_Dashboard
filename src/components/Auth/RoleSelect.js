import React from 'react';
import '../../styles/roleselect.css';

// Role selection component
const RoleSelect = ({ onSelect }) => (
  <div className="role-select">
    <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>LMS Dashboard</h1>
    <h2>Select Your Role</h2>
    <div className="role-btns">
      <button onClick={() => onSelect('admin')}>Admin</button>
      <button onClick={() => onSelect('student')}>Student</button>
    </div>
  </div>
);

export default RoleSelect;
