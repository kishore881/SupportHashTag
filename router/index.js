const axios = require('axios');
const woeid = require('twitter-woeid');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});
router.get('/trending', (req, res) => {
  res.sendFile('trends.html', { root: 'views' });
});

router.get('/tweets', async (req, res) => {
  const options = {
    method: 'GET',
    url: process.env.TWITTER_RAPID_API_HASHTAG,
    headers: {
      'X-RapidAPI-Key': process.env.TWITTER_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.TWITTER_RAPID_API_HOST,
    },
    params: { 
      hashtag: '#'+req.query.hashtag,
      limit: 20,
      section: 'top',
      continuation_token: req.query?.continuation_token ?? ''
    }
  };

  try {
    const response = await axios.request(options);
    res.send({ tweets: response.data.results, hashtag: req.query.hashtag, continuation_token: response.data.continuation_token });
  } catch (error) {
    console.log(error);
    res.send({ msg: 'Unknown Error. Please try again later.' });
  }
});

router.get('/trends', async (req, res) => {
  const region = woeid.getSingleWOEID(req.query.region)[0];
  if (region) {
    const options = {
      method: 'GET',
      url: process.env.TWITTER_RAPID_API_TRENDS,
      headers: {
        'X-RapidAPI-Key': process.env.TWITTER_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.TWITTER_RAPID_API_HOST,
      },
      params: {woeid: region.woeid},
    };

    try {
    	const response = await axios.request(options);
      res.send({ region: response.data[0].locations[0].name, trends: response.data[0].trends, msg: null });
    } catch (error) {
      console.log(error);
      res.send({ msg: 'Unknown error. Please try again later.' });
    }
  } else {
    res.send({ msg: 'No trends data found for the region. Please check the spelling or try something else.' });
  }
});

module.exports = router;