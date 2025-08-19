
import React from 'react';
import AdminTable from './Widgets/AdminTable';
import BarChartWidget from './Widgets/BarChartWidget';
import PieChartWidget from './Widgets/PieChartWidget';
import QuizCompletionTable from './Widgets/QuizCompletionTable';

/**
 * AdminDashboard
 * Main dashboard for admin users. Displays:
 * - Table of students and their quiz completion
 * - Bar chart of average grades by student
 * - Pie charts for quiz completion rates
 * - Table of quiz completion (aggregate)
 */
const AdminDashboard = () => (
  <div className="dashboard admin-dashboard">
    {/* Dashboard title */}
    <div className="dashboard-title">Admin Dashboard</div>
    {/* Table of students and quiz completion */}
    <div className="widget">
      <AdminTable />
    </div>
    {/* Bar chart of average grades by student */}
    <div className="widget">
      <BarChartWidget />
    </div>
    {/* Pie charts for quiz completion rates */}
    <div className="widget">
      <PieChartWidget />
    </div>
    {/* Table of quiz completion (aggregate) */}
    <div className="widget">
      <QuizCompletionTable />
    </div>
  </div>
);

export default AdminDashboard;
