import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutUs from './AboutUs';
import Questionnaire from './Questionnaire';
import Shop from './Shop';
import HealthRecord from './HealthRecord';
import Feedback from './Feedback';
import Home from './Home';
import BookAppointment from './BookAppointment';
import './App.css';

function App() {
  useEffect(() => {
    const chatbotConfigScript = document.createElement('script');
    chatbotConfigScript.innerHTML = `window.chtlConfig = { chatbotId: "2117134842" };`;
    document.body.appendChild(chatbotConfigScript);

    const chatbotEmbedScript = document.createElement('script');
    chatbotEmbedScript.src = "https://chatling.ai/js/embed.js";
    chatbotEmbedScript.async = true;
    chatbotEmbedScript.setAttribute('data-id', "2117134842");
    chatbotEmbedScript.id = "chatling-embed-script";
    document.body.appendChild(chatbotEmbedScript);

    return () => {
      document.body.removeChild(chatbotConfigScript);
      document.body.removeChild(chatbotEmbedScript);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="header">
          <h1>AyurWisdom Ayurvedic Organization</h1>
        </header>

        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/prakruti-assessment">Prakruti Assessment</Link>
          <Link to="/health-record">Health Record</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/book-appointment">Book Doctor's Appointment</Link>
          <Link to="/feedback">Feedback</Link>
        </nav>

        {/* Floating Voice Chatbot Button - Opens in New Tab */}
        <button
          onClick={() => window.open("http://localhost:8501/", "_blank")}
          className="voice-chatbot-button"
        >
          <img
            src="https://img.icons8.com/ios-filled/40/ffffff/microphone.png"
            alt="Voice Chatbot"
          />
        </button>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/prakruti-assessment" element={<Questionnaire />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/health-record" element={<HealthRecord />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 AyurWisdom Ayurvedic Organization. All rights reserved.</p>
            <div className="social-media">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" />
              </a>
            </div>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
