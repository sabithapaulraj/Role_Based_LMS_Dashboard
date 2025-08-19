
import React from 'react';
import students from '../../../mockData/students.json';
import courses from '../../../mockData/courses.json';
import '../../../styles/studenttable.css';

/**
 * StudentTable
 * Displays a table of enrolled courses for the given student.
 * Props:
 * - username: string (student's username)
 * Data:
 * - Finds student by username from students.json
 * - Maps enrollments to show course code, name, marks, and progress
 */
const StudentTable = ({ username }) => {
  // Find student by username
  const student = students.find(s => s.username === username);
  if (!student) return <div className="widget student-table">No data found for {username}</div>;
  return (
    <div className="widget student-table">
      <h3>Enrolled Courses</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Marks</th>
            <th>Progress (%)</th>
          </tr>
        </thead>
        <tbody>
          {/* Map each enrollment to a table row */}
          {student.enrollments.map((enroll, idx) => {
            const course = courses.find(c => c.courseId === enroll.courseId);
            return (
              <tr key={idx}>
                <td>{enroll.courseId}</td>
                <td>{course ? course.courseName : '-'}</td>
                <td>{enroll.grade}</td>
                <td>{enroll.progress}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
