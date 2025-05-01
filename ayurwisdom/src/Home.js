import React from 'react';
import './Home.css';

const doshas = [
  {
    name: 'Vata',
    description: 'Vata is the energy of movement and is associated with air and space elements. People with a dominant Vata dosha tend to be energetic, creative, and lively, but may also experience restlessness, anxiety, or irregular digestion if imbalanced. Vata governs functions like breathing, circulation, and the nervous system.',
    imageUrl: 'https://media.istockphoto.com/id/1213468573/vector/vata-dosha-ayurvedic-physical-constitution-of-human-body-type-editable-vector-illustration.jpg?s=612x612&w=0&k=20&c=4aCNCHNq00qhQ7dgsfjLzMItk2BAnHDO8oiKqEUr7c4=', // Vata Dosha image URL
  },
  {
    name: 'Pitta',
    description: 'Pitta is the energy of transformation and is linked to fire and water elements. Those with a Pitta-dominant constitution are often focused, ambitious, and sharp-minded. Pitta controls metabolism, digestion, and body temperature. An imbalance in Pitta may lead to anger, heartburn, or inflammation.',
    imageUrl: 'https://thumbs.dreamstime.com/z/pitta-dosha-ayurvedic-physical-constitution-human-body-type-editable-illustration-symbols-fire-water-90075540.jpg', // Pitta Dosha image URL
  },
  {
    name: 'Kapha',
    description: 'Kapha is the energy of stability and structure, associated with earth and water elements. People with a Kapha-dominant constitution tend to be calm, grounded, and compassionate. Kapha governs bodily structure, lubrication, and immunity. An excess of Kapha can result in lethargy, weight gain, or congestion.',
    imageUrl: 'https://st3.depositphotos.com/3772239/15861/v/450/depositphotos_158617064-stock-illustration-kapha-dosha-ayurvedic-physical-constitution.jpg', // Kapha Dosha image URL
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <h2>Learn About Doshas</h2>
      <div className="dosha-cards-container">
        {doshas.map((dosha, index) => (
          <div key={index} className="dosha-card">
            <img src={dosha.imageUrl} alt={dosha.name} className="dosha-image" />
            <h3>{dosha.name}</h3>
            <p>{dosha.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
