// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname))); // HTML és statikus fájlok kiszolgálása

const PORT = process.env.PORT || 3000;

// Ide tedd a saját API kulcsodat
const API_KEY = '182cb94e105538db0b5136e0cad02575';
const API_URL = 'https://v3.football.api-sports.io/fixtures';

// ===== Mai meccsek =====
app.get('/api/matches/today', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`${API_URL}?date=${today}`, {
            headers: { 'x-apisports-key': API_KEY }
        });
        const data = await response.json();
        res.json(data.response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== Élő / elő meccsek =====
app.get('/api/matches/live', async (req, res) => {
    try {
        const response = await fetch(`${API_URL}?live=all`, {
            headers: { 'x-apisports-key': API_KEY }
        });
        const data = await response.json();
        res.json(data.response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== HTML kiszolgálás =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));