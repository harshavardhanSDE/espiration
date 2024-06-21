import express from 'express'
import axios from 'axios'; 
import cors from 'cors';
import { config } from 'dotenv';

config(); 
const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const { prompt } = req.body;

    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await axios({
      method: 'POST',
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        key: apiKey,
      },
      data: data,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
