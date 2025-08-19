
import React from 'react';
import quizzes from '../../../mockData/quizzes.json';
import '../../../styles/studenttable.css';

/**
 * QuizCompletionTable
 * Displays a table of quiz completion status for a student or all students.
 * Props:
 * - username: string (optional, if provided shows only that student's quizzes)
 * Data:
 * - If username is provided, shows completed/remaining for that student
 * - If not, shows aggregate completed/remaining for each quiz
 */
const QuizCompletionTable = ({ username }) => {
  let quizData = [];
  if (username) {
    // For a specific student, show their quiz completion status
    quizData = quizzes.flatMap(q => q.scores.filter(s => s.username === username).map(s => ({
      quiz: q.quizName,
      completed: s.completed ? 1 : 0,
      remaining: s.completed ? 0 : 1
    })));
  } else {
    // For admin, show aggregate completion for each quiz
    quizData = quizzes.map(q => {
      const completed = q.scores.filter(s => s.completed).length;
      const remaining = q.scores.length - completed;
      return {
        quiz: q.quizName,
        completed,
        remaining
      };
    });
  }
  return (
    <div className="widget quiz-completion-table">
      <h3>Quiz Completion</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Completed</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {/* Map each quiz to a table row */}
          {quizData.map((quiz, idx) => (
            <tr key={idx}>
              <td>{quiz.quiz}</td>
              <td>{quiz.completed}</td>
              <td>{quiz.remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizCompletionTable;
