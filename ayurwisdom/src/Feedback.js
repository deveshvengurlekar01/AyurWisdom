import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    yourcomments: '',
    yourfeedback: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data before submission:', formData); // Debugging: log form data

    try {
      const response = await axios.post('http://localhost:5000/feedback', formData);

      console.log('Response:', response.data.message); // Debugging: log server response
      alert('Feedback submitted successfully!');
      setFormData({ name: '', email: '', yourcomments: '', yourfeedback: '' }); // Clear form
    } catch (error) {
      console.error('Error submitting feedback:', error); // Debugging: log error
      alert('There was an error submitting your feedback. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#e9f8ed',
      padding: '50px 15px',
      boxSizing: 'border-box'
    }}>
      <form 
        onSubmit={handleSubmit} 
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '40px 50px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Feedback</h2>

        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <textarea 
          name="yourcomments" 
          placeholder="Your Comments" 
          value={formData.yourcomments}
          onChange={handleChange}
          rows="5"
          style={{ ...inputStyle, resize: 'vertical' }}
          required
        />
        <textarea
          name="yourfeedback"
          placeholder="Your Feedback"
          value={formData.yourfeedback}
          onChange={handleChange}
          rows="3"
          style={{ ...inputStyle, resize: 'vertical' }}
          required
        />
        <button 
          type="submit" 
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '12px',
            backgroundColor: '#4caf50',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  boxSizing: 'border-box'
};

export default Feedback;