import React from 'react';

// Simple chat bubble component
const ChatBubble = ({ sender, text }) => (
  <div className={`chat-bubble ${sender}`}>{text}</div>
);

export default ChatBubble;
