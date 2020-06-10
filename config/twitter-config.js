const T = require('twit');

const Twitter = new T({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  timeout_ms: 600 * 1000,
  app_only_auth: true,
});

module.exports = Twitter;