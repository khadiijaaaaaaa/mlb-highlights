import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [player, setPlayer] = useState('');
  const [team, setTeam] = useState('');
  const [highlights, setHighlights] = useState([]);
  const [error, setError] = useState(null);

  const fetchHighlights = async () => {
    try {
      let url = 'http://127.0.0.1:5000/highlights';
      if (player) {
        url += `?player=${player}`;
      } else if (team) {
        url += `?team=${team}`;
      }

      const response = await axios.get(url);
      setHighlights(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch highlights. Please try again.');
      console.error(err);
    }
  };

  // Function to format the highlight as a news-style sentence
  const formatHighlight = (highlight) => {
    return (
      `${highlight.title} The ball had an exit velocity of ${highlight.ExitVelocity} mph, ` +
      `traveled ${highlight.HitDistance} feet, and was launched at an angle of ${highlight.LaunchAngle}°. ` +
      `This play was made by the ${highlight.team}.`
    );
  };

  return (
    <div>
      <h1>MLB Personalized Highlights</h1>

      <div>
        <input
          type="text"
          placeholder="Enter player name"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter team name"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <button onClick={fetchHighlights}>Get Highlights</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {highlights.map((highlight, index) => (
          <div key={index}>
            <h3>{formatHighlight(highlight)}</h3>
            <video src={highlight.video} controls width="300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;