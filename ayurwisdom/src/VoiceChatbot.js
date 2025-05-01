import React from 'react';

const VoiceChatbot = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="http://localhost:8501" // Update if deployed
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Ayurvedic Voice Chatbot"
      />
    </div>
  );
};

export default VoiceChatbot;
