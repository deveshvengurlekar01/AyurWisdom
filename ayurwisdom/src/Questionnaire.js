import React, { useState } from 'react';
import './Questionnaire.css';
import { Bar } from 'react-chartjs-2'; // Ensure to install chart.js and react-chartjs-2
import jsPDF from 'jspdf'; // Ensure to install jspdf

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    skin: '',
    frame: '',
    digestion: '',
    mood: '',
    sleep: '',
    temperament: '',
    sensitivity: '',
    face_shape: '',
    activity: '',
    dietary_choices: '',
    hair: '',
    climate: '',
    emotion: '',
    sleep_quality: '',
    stress_reaction: '',
    agility: '',
    appetite: '',
    body_temperature: '',
  });

  const [dosha, setDosha] = useState(''); // State for classified dosha
  const [suggestions, setSuggestions] = useState({}); // State for suggestions
  const [submitted, setSubmitted] = useState(false); // State to manage submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Define doshas and their suggestions
    const doshasWithSuggestions = {
      Vata: {
        food: 'Warm, nourishing foods like soups and stews.',
        lifestyle: 'Regular routines and gentle exercises.',
        career: 'Creative fields or roles requiring flexibility.',
        precautions: 'Stay warm and avoid cold and dry conditions.',
        emotional_state: 'Tend to feel anxious; practice grounding activities.',
        exercise: 'Yoga and Pilates; gentle activities.',
        yoga: 'Focus on grounding poses like Mountain and Warrior.',
      },
      Pitta: {
        food: 'Cooling foods like salads and fruits.',
        lifestyle: 'Balanced routines with relaxation techniques.',
        career: 'Leadership roles or fields requiring decisiveness.',
        precautions: 'Avoid overheating; stay cool.',
        emotional_state: 'May experience irritability; find calming practices.',
        exercise: 'Moderate activities like swimming or cycling.',
        yoga: 'Incorporate calming poses like Forward Bend and Child’s Pose.',
      },
      Kapha: {
        food: 'Light, dry foods; limit heavy and oily items.',
        lifestyle: 'Regular activity and mental stimulation.',
        career: 'Supportive roles or those requiring patience.',
        precautions: 'Avoid damp and heavy environments.',
        emotional_state: 'May feel lethargic; engage in motivating activities.',
        exercise: 'Vigorous activities like running or dancing.',
        yoga: 'Focus on energizing poses like Sun Salutations and Backbends.',
      },
      'Vata-Pitta': {
        food: 'Balanced meals with both warming and cooling ingredients.',
        lifestyle: 'Structured yet flexible routines.',
        career: 'Creative and analytical roles.',
        precautions: 'Maintain balance between heating and cooling factors.',
        emotional_state: 'May feel conflicted; practice mindfulness.',
        exercise: 'Combination of yoga and moderate cardio.',
        yoga: 'Blend of calming and invigorating poses.',
      },
      'Pitta-Kapha': {
        food: 'Cooling yet light meals; avoid heavy foods.',
        lifestyle: 'Moderation with a focus on relaxation.',
        career: 'Roles in management or strategy.',
        precautions: 'Balance passion with calmness.',
        emotional_state: 'May feel sluggish; aim for energizing practices.',
        exercise: 'Mix of light cardio and strength training.',
        yoga: 'Focus on dynamic and restorative poses.',
      },
      'Vata-Kapha': {
        food: 'Warm and light meals; avoid cold and heavy items.',
        lifestyle: 'Structured routines with light activity.',
        career: 'Supportive roles; good in healthcare or wellness.',
        precautions: 'Stay warm and active; avoid stagnation.',
        emotional_state: 'May feel unmotivated; engage in inspiring activities.',
        exercise: 'Gentle activities like walking or yoga.',
        yoga: 'Focus on grounding and gentle poses.',
      },
      'Vata-Pitta-Kapha': {
        food: 'Diverse meals with a balance of all tastes.',
        lifestyle: 'Flexibility with structure; adapt as needed.',
        career: 'Versatile roles; good at multitasking.',
        precautions: 'Stay balanced in all aspects of life.',
        emotional_state: 'May experience emotional highs and lows; practice balance.',
        exercise: 'Mix of vigorous and calming activities.',
        yoga: 'Blend of restorative and dynamic poses.',
      },
    };

    // Randomly select a dosha
    const doshaKeys = Object.keys(doshasWithSuggestions);
    const randomDosha = doshaKeys[Math.floor(Math.random() * doshaKeys.length)];

    // Get suggestions for the selected dosha
    const selectedSuggestions = doshasWithSuggestions[randomDosha];

    // Set state with the selected dosha and its suggestions
    setDosha(randomDosha);
    setSuggestions(selectedSuggestions);
    setSubmitted(true); // Mark form as submitted

    // Generate health report
    generateReport(randomDosha, selectedSuggestions);
  };

  const generateReport = (dosha, suggestions) => {
    const doc = new jsPDF();

    doc.text(`Health Report for ${formData.name}`, 20, 20);
    doc.text(`Classified Dosha: ${dosha}`, 20, 30);
    doc.text(`Suggestions:`, 20, 40);
    doc.text(`Food: ${suggestions.food}`, 20, 50);
    doc.text(`Lifestyle: ${suggestions.lifestyle}`, 20, 60);
    doc.text(`Career: ${suggestions.career}`, 20, 70);
    doc.text(`Precautions: ${suggestions.precautions}`, 20, 80);
    doc.text(`Emotional State: ${suggestions.emotional_state}`, 20, 90);
    doc.text(`Exercise: ${suggestions.exercise}`, 20, 100);
    doc.text(`Yoga: ${suggestions.yoga}`, 20, 110);


    doc.save('health_report.pdf');
  };

  const getDoshaData = () => {
    const doshaCounts = {
      Vata: 0,
      Pitta: 0,
      Kapha: 0,
    };

    // Count the selected dosha
    doshaCounts[dosha]++;

    // Calculate the percentage for the graph
    const data = [0, 0, 0];
    if (dosha === 'Vata') {
      data[0] = 100; // Vata
    } else if (dosha === 'Pitta') {
      data[1] = 100; // Pitta
    } else if (dosha === 'Kapha') {
      data[2] = 100; // Kapha
    } else if (dosha.includes('Vata') && dosha.includes('Pitta')) {
      data[0] = 50; // Vata
      data[1] = 50; // Pitta
    } else if (dosha.includes('Pitta') && dosha.includes('Kapha')) {
      data[1] = 50; // Pitta
      data[2] = 50; // Kapha
    } else if (dosha.includes('Vata') && dosha.includes('Kapha')) {
      data[0] = 50; // Vata
      data[2] = 50; // Kapha
    } else if (dosha.includes('Vata') && dosha.includes('Pitta') && dosha.includes('Kapha')) {
      data[0] = 33.33; // Vata
      data[1] = 33.33; // Pitta
      data[2] = 33.33; // Kapha
    }

    // Prepare the data for the graph
    const doshaData = {
      labels: ['Vata', 'Pitta', 'Kapha'],
      datasets: [
        {
          label: 'Dosha Representation',
          data: data,
          backgroundColor: 'rgba(0, 0, 139, 0.6)',
        },
      ],
    };

    return doshaData;
  };

  const getAdditionalData = () => {
    const additionalData = {
      labels: ['Stress Reaction', 'Sleep Quality', 'Activity', 'Emotion'],
      datasets: [
        {
          label: 'Requirements',
          data: [
            // Invert values for Stress Reaction
            formData.stress_reaction === 'No Reaction' ? 100 : 
            formData.stress_reaction === 'With anxiety' ? 50 : 
            formData.stress_reaction === 'Panicking' ? 0 : 0,

            // Invert values for Sleep Quality
            formData.sleep_quality === 'Excellent' ? 0 : 
            formData.sleep_quality === 'Good' ? 25 : 
            formData.sleep_quality === 'Fair' ? 50 : 
            formData.sleep_quality === 'Poor' ? 100 : 0,

            // Invert values for Activity
            formData.activity === 'Multitasking' ? 10 : 
            formData.activity === 'Active' ? 30 : 
            formData.activity === 'Vigorous' ? 10 : 
            formData.activity === 'Lounging' ? 80 : 
            formData.activity === 'Sedentary' ? 90 : 100,

            // Invert values for Emotion
            formData.emotion === 'Rarely' ? 100 : 
            formData.emotion === 'Sometimes' ? 50 : 
            formData.emotion === 'Often' ? 0 : 0,
          ],
          backgroundColor: 'rgba(204, 85, 0, 0.6)',
        },
      ],
    };

    return additionalData;
  };
  


  return (
    <div>
      {!submitted ? (
<form onSubmit={handleSubmit}>
  {/* 1. Name */}
  <label>
    1. What is your name? <br />
    <small>Please enter your full name.</small>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </label>

  {/* 2. Age */}
  <label>
    2. What is your age? (Enter a number) <br />
    <small>Enter your age in years.</small>
    <input
      type="number"
      name="age"
      value={formData.age}
      onChange={handleChange}
      required
    />
  </label>

  {/* 3. Gender */}
  <label>
    3. What is your gender? <br />
    <small>Select the gender you identify with.</small>
    <select name="gender" value={formData.gender} onChange={handleChange} required>
      <option value="">Select</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </label>

  {/* 4. Height */}
  <label>
    4. What is your height (in cm)? <br />
    <small>Provide your height in centimeters.</small>
    <input
      type="number"
      name="height"
      value={formData.height}
      onChange={handleChange}
      required
    />
  </label>

  {/* 5. Weight */}
  <label>
    5. What is your weight (in kg)? <br />
    <small>Provide your weight in kilograms.</small>
    <input
      type="number"
      name="weight"
      value={formData.weight}
      onChange={handleChange}
      required
    />
  </label>

{/* 6. Skin Type */}
<label>
  6. What is your skin type? <br />
  <small>Choose the option that best describes your skin.</small>
  <select name="skin" value={formData.skin} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Dry" title="Dry skin feels tight and may appear flaky or rough.">Dry</option>
    <option value="Oily" title="Oily skin tends to look shiny, especially in the T-zone (forehead, nose, chin).">Oily</option>
    <option value="Normal" title="Normal skin is neither too oily nor too dry and has a healthy balance.">Normal</option>
  </select>
</label>

{/* 7. Body Frame */}
<label>
  7. What is your body frame? <br />
  <small>Small: slim bones, Large: broad build, Medium: average.</small>
  <select name="frame" value={formData.frame} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Small" title="Small frame refers to a slim build with narrower bones.">Small</option>
    <option value="Medium" title="Medium frame refers to an average build with a moderate bone structure.">Medium</option>
    <option value="Large" title="Large frame refers to a broad build with larger bones and joints.">Large</option>
  </select>
</label>

{/* 8. Digestion */}
<label>
  8. How would you describe your digestion? <br />
  <small>Fast: hungry soon after eating, Slow: feel heavy after meals.</small>
  <select name="digestion" value={formData.digestion} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Fast" title="Fast digestion means feeling hungry again shortly after eating.">Fast</option>
    <option value="Moderate" title="Moderate digestion means feeling okay after meals, not too hungry or heavy.">Moderate</option>
    <option value="Slow" title="Slow digestion means feeling full or heavy for a long time after eating.">Slow</option>
  </select>
</label>

{/* 9. Mood */}
<label>
  9. How would you describe your mood? <br />
  <small>Choose what you mostly feel on a daily basis.</small>
  <select name="mood" value={formData.mood} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Calm" title="Calm mood is peaceful and balanced, without much emotional fluctuation.">Sad</option>
    <option value="Anxious" title="Anxious mood is characterized by nervousness or unease, often with uncertainty.">Anxious</option>
    <option value="Excited" title="Excited mood is full of energy and anticipation, often with a sense of eagerness.">Excited</option>
  </select>
</label>

{/* 10. Sleep */}
<label>
  10. How would you describe your sleep pattern? <br />
  <small>Light: wake up easily, Deep: uninterrupted, Interrupted: frequent waking.</small>
  <select name="sleep" value={formData.sleep} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Light" title="Light sleep means waking up frequently and not feeling fully rested.">Light</option>
    <option value="Deep" title="Deep sleep means uninterrupted rest and feeling refreshed after waking up.">Deep</option>
    <option value="Interrupted" title="Interrupted sleep means waking up multiple times throughout the night.">Interrupted</option>
  </select>
</label>

{/* 11. Temperament */}
<label>
  11. How would you describe your temperament? <br />
  <small>Select the option closest to your usual behavior.</small>
  <select name="temperament" value={formData.temperament} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Steady" title="Steady temperament is calm, dependable, and supportive, with a balanced approach.">Steady and supportive</option>
    <option value="Active" title="Active temperament is focused, energetic, and always ready to engage.">Active and focused</option>
    <option value="Creative" title="Creative temperament is imaginative, expressive, and often filled with ideas.">Creative and chatty</option>
    <option value="Adaptable" title="Adaptable temperament is flexible, open to change, and able to handle varying situations.">Adaptable and flexible</option>
  </select>
</label>

{/* 12. Sensitivity */}
<label>
  12. How sensitive are you? <br />
  <small>How often do emotions or situations affect you deeply?</small>
  <select name="sensitivity" value={formData.sensitivity} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Rarely" title="Rarely sensitive means you are less likely to be affected emotionally by situations.">Rarely sensitive</option>
    <option value="Sometimes" title="Sometimes sensitive means you can be affected by emotions but not frequently.">Sometimes sensitive</option>
    <option value="Highly" title="Highly sensitive means you feel emotions deeply and react strongly to situations.">Highly sensitive</option>
  </select>
</label>


{/* 13. Face Shape */}
<label>
  13. What is your face shape? <br />
  <small>Observe your facial outline in a mirror.</small>
  <select name="face_shape" value={formData.face_shape} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Round" title="A round face has soft curves with almost equal length and width.">Round</option>
    <option value="Angular" title="An angular face has sharper features, with prominent cheekbones and jawlines.">Angular</option>
    <option value="Combination" title="A combination face shape may have different features in different areas (e.g., a broader forehead and a more angular jaw).">Combination</option>
    <option value="Long" title="A long face shape is longer than it is wide, often with a more prominent chin and forehead.">Long</option>
  </select>
</label>


{/* 14. Activity */}
<label>
  14. How would you describe your activity level? <br />
  <small>Based on your daily movement and lifestyle.</small>
  <select name="activity" value={formData.activity} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Multitasking" title="Multitasking involves juggling several tasks at once, often with high energy.">Multitasking</option>
    <option value="Lounging" title="Lounging refers to a relaxed, sedentary lifestyle with minimal physical movement.">Lounging</option>
    <option value="Active" title="Active involves engaging in regular physical activity, such as walking or sports.">Active</option>
    <option value="Sedentary" title="Sedentary means little to no physical activity, typically spent sitting or lying down.">Sedentary</option>
    <option value="Vigorous" title="Vigorous involves intense physical activity like running, heavy workouts, or strenuous labor.">Vigorous</option>
  </select>
</label>

{/* 15. Dietary Choices */}
<label>
  15. What are your dietary choices? <br />
  <small>Select the type of food you mostly prefer.</small>
  <select name="dietary_choices" value={formData.dietary_choices} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Spicy" title="Spicy food involves strong, pungent flavors from ingredients like chili or pepper.">Spicy</option>
    <option value="Cooling" title="Cooling food is mild and refreshing, often including ingredients like cucumber or dairy.">Cooling</option>
    <option value="Sweet" title="Sweet food includes sugary and rich flavors, often with fruits or desserts.">Sweet</option>
    <option value="Light" title="Light food is easy to digest, often low in fat and calories, such as fruits or salads.">Light</option>
  </select>
</label>

{/* 16. Hair Type */}
<label>
  16. What is your hair type? <br />
  <small>Choose the one that matches your natural hair.</small>
  <select name="hair" value={formData.hair} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Combination" title="Combination hair has oily roots and dry ends, requiring balanced care.">Combination</option>
    <option value="Medium" title="Medium hair is neither too thick nor too thin, typically easy to manage.">Medium</option>
    <option value="Thick" title="Thick hair has a fuller appearance, often requiring more time to style and maintain.">Thick</option>
    <option value="Thin" title="Thin hair has less volume, often appearing flat and may require gentle styling.">Thin</option>
  </select>
</label>

{/* 17. Climate */}
<label>
  17. What kind of climate do you prefer? <br />
  <small>Which environment makes you feel most comfortable?</small>
  <select name="climate" value={formData.climate} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Tropical" title="Tropical climates are warm with high humidity and lots of rainfall.">Tropical</option>
    <option value="Temperate" title="Temperate climates have moderate temperatures and distinct seasons.">Temperate</option>
    <option value="Cold" title="Cold climates are typically cooler with low temperatures, sometimes freezing.">Cold</option>
  </select>
</label>

{/* 18. Emotion */}
<label>
  18. How emotional are you? <br />
  <small>How often do you experience strong emotions?</small>
  <select name="emotion" value={formData.emotion} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Rarely" title="Rarely emotional means emotions do not often affect you significantly.">Rarely emotional</option>
    <option value="Sometimes" title="Sometimes emotional means emotions can affect you, but not regularly.">Sometimes emotional</option>
    <option value="Often" title="Often emotional means you experience strong emotions frequently in daily situations.">Often emotional</option>
  </select>
</label>

{/* 19. Sleep Quality */}
<label>
  19. How would you rate your sleep quality? <br />
  <small>Think about how refreshed you feel after sleeping.</small>
  <select name="sleep_quality" value={formData.sleep_quality} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Excellent" title="Excellent sleep means feeling well-rested and refreshed after sleep.">Excellent</option>
    <option value="Good" title="Good sleep means feeling rested, but not as fully refreshed as excellent sleep.">Good</option>
    <option value="Fair" title="Fair sleep means occasional interruptions or not feeling fully rested.">Fair</option>
    <option value="Poor" title="Poor sleep means frequent waking, discomfort, or unrest during sleep.">Poor</option>
  </select>
</label>

{/* 20. Stress Reaction */}
<label>
  20. How do you react to stress? <br />
  <small>Choose the most common response you experience.</small>
  <select name="stress_reaction" value={formData.stress_reaction} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="No Reaction" title="No Reaction means you stay calm or unaffected when stressed.">No Reaction</option>
    <option value="With anxiety" title="With anxiety means feeling nervous or worried when stressed.">With anxiety</option>
    <option value="Panicking" title="Panicking means experiencing intense distress or fear under stress.">Panicking</option>
  </select>
</label>

{/* 21. Agility */}
<label>
  21. How agile are you? <br />
  <small>Agility refers to how easily and quickly you move.</small>
  <select name="agility" value={formData.agility} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Very Agile" title="Very agile means you can move quickly and smoothly in various directions.">Very Agile</option>
    <option value="Moderately Agile" title="Moderately agile means you move with some ease, but not quickly or fluidly.">Moderately Agile</option>
    <option value="Not Very Agile" title="Not very agile means you find it difficult to move quickly or easily.">Not Very Agile</option>
  </select>
</label>

{/* 22. Appetite */}
<label>
  22. How would you describe your appetite? <br />
  <small>How often and how strongly do you feel hungry?</small>
  <select name="appetite" value={formData.appetite} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Strong" title="Strong appetite means you feel hungry frequently and strongly.">Strong</option>
    <option value="Moderate" title="Moderate appetite means you feel hunger in a balanced way, neither too often nor too rarely.">Moderate</option>
    <option value="Weak" title="Weak appetite means you rarely feel hungry or only mildly.">Weak</option>
  </select>
</label>

{/* 23. Body Temperature */}
<label>
  23. What is your body temperature? <br />
  <small>How does your body usually feel to the touch?</small>
  <select name="body_temperature" value={formData.body_temperature} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="Warm" title="Warm body temperature means your body feels naturally warm to the touch.">Warm</option>
    <option value="Cool" title="Cool body temperature means your body feels slightly cooler than average.">Cool</option>
    <option value="Cold" title="Cold body temperature means your body feels cooler or even chilly to the touch.">Cold</option>
  </select>
</label>


  <button type="submit">Submit</button>
</form>

      ) : (
        <div>
          <h2>Your Results:</h2>
          <p style={{ fontSize: '24px', color: 'green', fontWeight: 'bold' }}>Classified Dosha: {dosha}</p>
          <h3>Suggestions:</h3>
          <p><strong>Food:</strong> {suggestions.food}</p>
          <p><strong>Lifestyle:</strong> {suggestions.lifestyle}</p>
          <p><strong>Career:</strong> {suggestions.career}</p>
          <p><strong>Precautions:</strong> {suggestions.precautions}</p>
          <p><strong>Emotional State:</strong> {suggestions.emotional_state}</p>
          <p><strong>Exercise:</strong> {suggestions.exercise}</p>
          <p><strong>Yoga:</strong> {suggestions.yoga}</p>

          <h3>Health Graph:</h3>
          <Bar data={getDoshaData()} />

          {/* Additional graphs for factors related to dosha */}
          <h3>Factors Related to Dosha:</h3>
          <Bar data={getAdditionalData()} />
        </div>
      )}
    </div>
  );
};



export default Questionnaire;
