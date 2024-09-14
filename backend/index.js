// const express = require('express');
const axios = require('axios');

const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors(
  {
    origin:["https://aco-news-lmu8.vercel.app/"],
    methods:["POST", "GET"],
    credentials:true
  }
));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GNEWS_API_KEY; 


const functions = require('firebase-functions');



app.get('/api', (req, res) => {
  res.send("Hello from Firebase Functions");
});

exports.api = functions.https.onRequest(app);


app.get('/api/top-headlines', async (req, res) => {
    const { category = 'general', lang = 'en', country = 'in' } = req.query;
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&country=${country}&max=10&apikey=${API_KEY}`;
  
    try {
      const response = await axios.get(url);
      console.log('Fetching URL:', url);
      console.log('Response data:', response.data);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      res.status(500).json({ message: 'Failed to fetch news. Please try again later.' });
    }
  });
  
  



// Endpoint to search news articles
app.get('/api/search', async (req, res) => {
    try {
      const { q, lang = 'en', country = 'us', max = 10 } = req.query;
      const url = `https://gnews.io/api/v4/search?q=${q}&lang=${lang}&country=${country}&max=${max}&apikey=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error searching news:', error);
      res.status(500).json({ error: 'Failed to search news' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
