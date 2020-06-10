const express = require('express');
const router = express.Router();

const Twitter = require('../config/twitter-config');

router.get('/', (req, res) => {
  res.render('index', { tweets: [], hashtag: "" });
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
      console.log(tweets.length);
      console.log(data.search_metadata);
      res.send({ tweets: tweets, hashtag: req.query.hashtag });
    } else {
      console.log(err);
    }
  });

});

module.exports = router;