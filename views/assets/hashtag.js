const spinner = `<div class="d-flex justify-content-center" id="loading">
<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>`;

$("#query-form").submit(function (event) {
  event.preventDefault();

  $(".loading")[0].innerHTML = spinner;
  $("#content")[0].innerHTML = "";
  $("#more")[0].innerHTML = "";

  var $form = $(this),
    tag = $form.find("input[name='hashtag']").val(),
    url = '/tweets';

  $.get(url, { hashtag: tag }, function (data) {
    if (data.msg) {
      $(".loading")[0].innerHTML = '';
      $(".messages")[0].innerHTML = data.msg;
    }
    tweets = data.tweets;
    hashtag = data.hashtag;
    render();
  });
});

function render() {
  let count = Math.min(20, tweets.length);
  addTargets(tweets.slice(0, count), (count < tweets.length), hashtag);
  tweets = tweets.slice(count, tweets.length);
}


function addTargets(tweets, anymore, hashtag) {
  for (i = 0; i < tweets.length; i++) {
    if ($(`#${tweets[i].id_str}`)[0]) continue;
    $("#content").append(`<div class="card border-0 m-0">
    <div class="tweet shadow-sm" style="min-width: 300px;" id="${tweets[i].id_str}"></div>
  </div>`);
  }

  addWidgets(tweets, anymore, hashtag);
}

function addWidgets(tweets, anymore, hashtag) {
  for (i = 0; i < tweets.length; i++) {
    twttr.widgets.createTweet(
      tweets[i].id_str, $(`#${tweets[i].id_str}`)[0],
      {
        conversation: 'all',    // or all
        cards: 'visible',  // or hidden
        align: "center", // or left or right
      })
      .then(function (el) {
        el;
        var load = document.getElementById('loading');
        if (load)
          load.remove();
      });
  }
  if (anymore) {
    loadMore('SHOW MORE', hashtag);
  }
  else {
    findMore('SEE MORE ON TWITTER', hashtag);
  }
}
function findMore(text, hashtag) {
  if(!$('#load-btn')[0]) loadButton('');
  $('#load-btn').prop("onclick", null).off("click");
  $('#load-btn')[0].innerText = text;
  $('#load-btn').wrap(`<a href="https://twitter.com/search/?q=%23${hashtag}" target=null></a>`);
}

function loadMore(text, hashtag) {
  if (!$('#load-btn')[0]) {
    loadButton(text);
  }
  if (!$('#tweet-btn')[0]) {
    tweetButton(hashtag);
  }
}
const loadButton = (text) => {
  $('#more').append(`<button type="button" class="btn btn-outline-primary mx-5" id="load-btn">${text}</button>`);
  $('#load-btn').click(function () {
    render();
  })
}

const tweetButton = (hashtag) => {
  $('#more').append(`<div class="d-flex flex-column justify-content-center mx-5" id="tweet-btn"></div>`);
  twttr.widgets.createHashtagButton(
    hashtag, $('#tweet-btn')[0],
    {
      size: "large"
    }
  );
}