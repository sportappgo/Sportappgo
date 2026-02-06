const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY; // Render ENV
const API_URL = 'https://v3.football.api-sports.io/fixtures';

app.get('/api/matches/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const response = await fetch(`${API_URL}?date=${today}`, {
      headers: {
        'x-apisports-key': API_KEY
      }
    });

    const data = await response.json();
    res.json(data.response || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API RUNNING');
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});