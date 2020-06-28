const express = require('express');
const router = express.Router();

const Twitter = require('../config/twitter-config');
const woeid = require('twitter-woeid');

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});
router.get('/trending', (req, res) => {
  res.sendFile('trends.html', { root: 'views' });
});

router.get('/tweets', (req, res) => {

  const params = {
    q: `#${req.query.hashtag} -filter:retweets`,
    count: 200,
    result_type: 'mixed',
  };

  Twitter.get("search/tweets", params, function (
    err,
    data,
    response
  ) {
    if (!err && data.statuses) {
      var tweets = data.statuses;
      res.send({ tweets: tweets, hashtag: req.query.hashtag });
    } else {
      res.send({ msg: 'Unknown Error. Please try again later.' });
    }
  });

});

router.get('/trends', (req, res) => {
  const region = woeid.getSingleWOEID(req.query.region)[0];
  if (region) {
    const params = {
      id: region.woeid,
    }
    Twitter.get("trends/place", params, function (err, data, response) {
      if (!err && data[0].trends) {
        res.send({ region: data[0].locations[0].name, trends: data[0].trends, msg: null });
      } else {
        res.send({ msg: 'Unknown error. Please try again later.' });
      }
    })
  } else {
    res.send({ msg: 'No trends data found for the region. Please check the spelling or try something else.' });
  }
});

module.exports = router;