import React from 'react';
import students from '../../../mockData/students.json';

// Table of students and quiz completion %
const AdminTable = () => (
  <div className="widget admin-table" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h3>Students Quiz Completion</h3>
    <table className="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, idx) => {
          const avgGrade = (student.enrollments.reduce((sum, e) => sum + e.grade, 0) / student.enrollments.length).toFixed(1);
          return (
            <tr key={idx}>
              <td>{student.fullName}</td>
              <td>{avgGrade}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default AdminTable;
