
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import quizzes from '../../../mockData/quizzes.json';
import courses from '../../../mockData/courses.json';

/**
 * LineChartWidget
 * Displays a line chart of quiz scores trend for a student.
 * Props:
 * - username: string (student's username)
 * Data:
 * - For the given student, finds all quizzes and scores
 * - Shows quiz name, score, and course name in tooltip
 */
const LineChartWidget = ({ username }) => {
  // Build quiz history for the student
  const quizHistory = quizzes.flatMap(q => {
    const course = courses.find(c => c.courseId === q.courseId);
    return q.scores.filter(s => s.username === username).map(s => ({
      quiz: q.quizName,
      score: s.score,
      courseName: course ? course.courseName : q.courseId
    }));
  });

  // Custom tooltip for chart points
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { quiz, score, courseName } = payload[0].payload;
      return (
        <div style={{ background: '#fff', border: '1px solid #eee', padding: '0.7rem', borderRadius: '8px' }}>
          <div><b>Quiz:</b> {quiz}</div>
          <div><b>Course:</b> {courseName}</div>
          <div><b>Score:</b> {score}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="widget line-chart-widget">
      <h3>Quiz Scores Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={quizHistory}>
          <XAxis dataKey="quiz" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWidget;
