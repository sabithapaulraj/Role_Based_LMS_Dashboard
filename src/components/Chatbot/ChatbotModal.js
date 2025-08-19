import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import chatbotQA from '../../mockData/chatbotQA.json';
import charts from '../../mockData/charts.json';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];


// Chatbot modal component with accessibility
const ChatbotModal = ({ onClose }) => {
  const { role, user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hi ${role}, ask me anything!` }
  ]);
  const [input, setInput] = useState('');
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Focus trap and Escape key to close
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusable = modalRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"]), input');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle user input
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    handleBotResponse(input);
    setInput('');
    if (inputRef.current) inputRef.current.focus();
  };

  // Bot response logic
  const handleBotResponse = (userInput) => {
    // For student role, filter by username and exact question
    if (role === 'student' && user?.username) {
      const qa = chatbotQA[role].find(q =>
        q.username === user.username &&
        q.question.toLowerCase() === userInput.toLowerCase()
      );
      if (qa) {
        setMessages(prev => [...prev, { sender: 'bot', text: qa.answer }]);
        if (qa.chartType && qa.datasetKey) {
          setMessages(prev => [...prev, { sender: 'chart', chartType: qa.chartType, datasetKey: qa.datasetKey }]);
        }
        return;
      }
    }
    // For admin, first try exact match, then fallback to keyword match
    let qa = chatbotQA[role].find(q => q.question.toLowerCase() === userInput.toLowerCase());
    if (!qa) {
      qa = chatbotQA[role].find(q => {
        const keywords = q.question.toLowerCase().split(/\s+/);
        return keywords.some(kw => userInput.toLowerCase().includes(kw));
      });
    }
    if (qa) {
      setMessages(prev => [...prev, { sender: 'bot', text: qa.answer }]);
      if (qa.chartType && qa.datasetKey) {
        setMessages(prev => [...prev, { sender: 'chart', chartType: qa.chartType, datasetKey: qa.datasetKey }]);
      }
    } else {
      setMessages(prev => [...prev, { sender: 'bot', text: "I don't know yet." }]);
    }
  };

  // Render chart bubble
  const renderChart = (type, key) => {
    if (type === 'pie' && charts[key]) {
      // For admin quizCompletion, sum completed/remaining for all quizzes
      if (key === 'quizCompletion') {
        const totalCompleted = charts[key].reduce((sum, q) => sum + (q.completed || 0), 0);
        const totalRemaining = charts[key].reduce((sum, q) => sum + (q.remaining || 0), 0);
        const pieData = [
          { name: 'Completed', value: totalCompleted },
          { name: 'Remaining', value: totalRemaining }
        ];
        return (
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx={100}
                cy={100}
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      }
      // ...existing code for other pie charts...
    }
    if (type === 'line' && charts[key]) {
      let chartData = charts[key];
      // If studentProgress, select current user's array
      if (key === 'studentProgress' && user?.username && chartData[user.username]) {
        chartData = chartData[user.username];
      }
      return (
        <ResponsiveContainer width={200} height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    if (type === 'bar' && charts[key]) {
      let chartData = charts[key];
      // Handle studentGrades as object keyed by username
      if (key === 'studentGrades' && user?.username && chartData[user.username]) {
        chartData = chartData[user.username];
      }
      // adminMetrics and averageScores are arrays
      return (
        <ResponsiveContainer width={220} height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey={key === 'studentGrades' ? 'quiz' : (key === 'adminMetrics' ? 'name' : 'username')} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={key === 'studentGrades' ? 'score' : (key === 'adminMetrics' ? 'marks' : 'average')} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  return (
    <div className="chatbot-modal" role="dialog" aria-modal="true" aria-label="Chatbot" ref={modalRef}>
      <div className="chatbot-header">
        <span>Chatbot</span>
        <button aria-label="Close chatbot" onClick={onClose}>X</button>
      </div>
      <div className="chatbot-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.sender === 'chart' ? renderChart(msg.chartType, msg.datasetKey) : msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} placeholder="Type your question..." aria-label="Chatbot input" />
        <button aria-label="Send message" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotModal;
