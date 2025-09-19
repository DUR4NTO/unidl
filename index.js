const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// রুটস
app.use('/api/download', require('./routes/download'));

// হোম পেজ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// সার্ভার শুরু
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
