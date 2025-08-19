
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import students from '../../../mockData/students.json';

/**
 * BarChartWidget
 * Displays a bar chart of average grade by student (admin view).
 * Data:
 * - Filters for main students (Sabitha and Shalini)
 * - Calculates average grade and progress for each student
 */
const chartData = students
  .filter(student => student.username === 'sabitha' || student.username === 'shalini')
  .map(student => ({
    name: student.fullName,
    grade: student.enrollments.reduce((sum, e) => sum + e.grade, 0) / student.enrollments.length,
    progress: student.enrollments.reduce((sum, e) => sum + e.progress, 0) / student.enrollments.length
  }));

const BarChartWidget = () => (
  <div className="widget bar-chart-widget">
    <h3>Average Grade by Student</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* Bar for average grade */}
        <Bar dataKey="grade" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartWidget;
