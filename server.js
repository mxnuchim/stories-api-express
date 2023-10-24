const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/stories', async (req, res) => {
  console.log('endpoint hit!');
  try {
    const apiKey = process.env.NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;
    const { data } = await axios.get(url);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: 'Failed to fetch data from the New York Times API.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
