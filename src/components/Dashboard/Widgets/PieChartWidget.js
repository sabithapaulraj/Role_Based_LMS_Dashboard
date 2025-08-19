
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import quizzes from '../../../mockData/quizzes.json';

// Color scheme: Blue for completed, Red for not completed
const COLORS = ['#0088FE', '#FF4C4C'];

/**
 * PieChartWidget
 * Displays pie charts for quiz completion rates (admin view).
 * For each quiz, shows number of students completed vs. remaining.
 * Data:
 * - Aggregates all quizzes from quizzes.json
 * - For each quiz, calculates completed and remaining counts
 */
const PieChartWidget = () => {
  return (
    <div className="widget pie-chart-widget">
      <h3>Quiz Completion (All Students)</h3>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Render a pie chart for each quiz */}
        {quizzes.map((quiz, idx) => {
          const completed = quiz.scores.filter(s => s.completed).length;
          const remaining = quiz.scores.length - completed;
          const pieData = [
            { name: 'Completed', value: completed },
            { name: 'Remaining', value: remaining }
          ];
          return (
            <div key={quiz.quizId} style={{ minWidth: 220 }}>
              <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{quiz.quizName}</h4>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx={110}
                    cy={100}
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {/* Color each slice appropriately */}
                    {[0, 1].map(i => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChartWidget;
