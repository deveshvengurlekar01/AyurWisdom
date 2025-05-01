import React from 'react';
import './AboutUs.css'; // Make sure to create this CSS file

const AboutUs = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p className="intro">
        Welcome to AyurWisdom, your trusted partner in achieving holistic well-being through the ancient science of Ayurveda. 
        Our mission is to provide personalized wellness solutions that nurture the mind, body, and spirit.
      </p>
      <h3>Our Vision</h3>
      <p>
        At AyurWisdom, we envision a world where individuals can lead healthier, balanced lives by integrating Ayurvedic principles 
        into their daily routines. We strive to create a community that values natural healing and embraces wellness through 
        a personalized approach.
      </p>
      <h3>Our Mission</h3>
      <p>
        Our mission is to empower individuals with the knowledge and tools to take control of their health. We offer tailored 
        consultations, educational resources, and premium Ayurvedic products designed to support your journey to optimal 
        health and vitality.
      </p>
      <h3>Why Choose Us?</h3>
      <ul>
        <li>Expert Guidance: Our team of certified Ayurvedic practitioners brings years of experience and a deep understanding of 
        Ayurvedic principles.</li>
        <li>Personalized Solutions: We believe that wellness is not one-size-fits-all. Our tailored consultations and products 
        cater to your unique needs.</li>
        <li>Quality Products: We source only the finest Ayurvedic herbs and ingredients to ensure that you receive the best 
        possible care.</li>
        <li>Community Focus: Join our community of like-minded individuals who are on a journey to wellness. We offer workshops, 
        events, and online resources to support you.</li>
      </ul>
      <h3>Join Us on Your Wellness Journey</h3>
      <p>
        Whether you're new to Ayurveda or seeking to deepen your knowledge, AyurWisdom is here to guide you every step of the 
        way. Explore our resources, schedule a consultation, and discover the transformative power of Ayurveda.
      </p>
    </div>
  );
};

export default AboutUs;
