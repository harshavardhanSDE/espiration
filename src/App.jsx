import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post('http://localhost:4000/api/generate', {
          prompt: "what is an api key",
        });

        setResponse(result.data);
      } catch (err) {
        console.error('Error generating response:', err);
        setError('Error generating response.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>{response ? JSON.stringify(response) : 'Getting response ...'}</div>
    </div>
  );
};

export default App;
