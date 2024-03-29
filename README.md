# SupportHashTag
> Find Trends in any region and Tweets on any HashTag
>
> Built with Node.js, Express.js, HTML and jQuery using [Twitter Rapid API](https://rapidapi.com/omarmhaimdat/api/twitter154) [^1]

Currently hosted at: https://support-hashtag.onrender.com/

https://github.com/kishore881/SupportHashTag/assets/49707819/1cfedc08-29b0-48b9-becd-2cc9dd8ea63b

## How to Run
- subscribe to [Twitter Rapid API](https://rapidapi.com/omarmhaimdat/api/twitter154)(free tier available) and get the host, API Key.
- clone the repo and add a ```.env``` file at ```<repo root>/config/.env```
  ```.env
  TWITTER_RAPID_API_TRENDS=https://<TWITTER_RAPID_API_HOST>/trends/
  TWITTER_RAPID_API_HASHTAG=https://<TWITTER_RAPID_API_HOST>/hashtag/hashtag
  TWITTER_RAPID_API_KEY=
  TWITTER_RAPID_API_HOST=
  CORSURL=*
  ```
- npm install
- npm run start
- visit http://localhost:3000/

### Notes:
[^1]: [Twitter Rapid API](https://rapidapi.com/omarmhaimdat/api/twitter154) was introdued in [commit acc3ca4](https://github.com/kishore881/SupportHashTag/commit/acc3ca4e03076756706e4097c30229164ae66e15) replacing Twitter API v1.1
