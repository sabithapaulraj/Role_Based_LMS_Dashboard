
import React from 'react';
import StudentTable from './Widgets/StudentTable';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LineChartWidget from './Widgets/LineChartWidget';
import QuizCompletionTable from './Widgets/QuizCompletionTable';

/**
 * StudentDashboard
 * Main dashboard for student users. Displays:
 * - Enrolled courses in a table
 * - Quiz scores trend in a line chart
 * - Quiz completion status in a table
 * Uses AuthContext to get the current logged-in student.
 */
const StudentDashboard = () => {
  // Get current user from AuthContext
  const { user } = useContext(AuthContext);
  return (
    <div className="dashboard student-dashboard">
      {/* Dashboard title */}
      <div className="dashboard-title">Student Dashboard</div>
      {/* Table of enrolled courses */}
      <div className="widget">
        <StudentTable username={user?.username} />
      </div>
      {/* Line chart of quiz scores trend */}
      <div className="widget">
        <LineChartWidget username={user?.username} />
      </div>
      {/* Table of quiz completion status */}
      <div className="widget">
        <QuizCompletionTable username={user?.username} />
      </div>
    </div>
  );
};

export default StudentDashboard;
