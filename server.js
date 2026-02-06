const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// API key
const API_KEY = '182cb94e105538db0b5136e0cad02575';

// 👉 STATIKUS HTML KISZOLGÁLÁS
app.use(express.static('public'));

// 👉 FŐOLDAL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MAI MECCSEK
app.get('/api/matches/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${today}&timezone=Europe/Budapest`,
      {
        headers: { 'x-apisports-key': API_KEY }
      }
    );

    const data = await response.json();
    res.json(data.response || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LIVE MECCSEK
app.get('/api/matches/live', async (req, res) => {
  try {
    const response = await fetch(
      'https://v3.football.api-sports.io/fixtures?live=all',
      {
        headers: { 'x-apisports-key': API_KEY }
      }
    );

    const data = await response.json();
    res.json(data.response || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);