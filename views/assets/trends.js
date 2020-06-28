const spinner = `<div class="d-flex justify-content-center" id="loading">
<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>`;

$("#trend-form").submit(function (event) {
  event.preventDefault();

  $(".loading")[0].innerHTML = spinner;
  if ($('#region-head')[0]) {
    $('#region-head').remove();
  }
  if ($('#content')[0]) {
    $('#content')[0].innerHTML = "";
  }
  $('.messages')[0].innerHTML = "";

  var $form = $(this),
    region = $form.find("input[name='region']").val(),
    url = '/trends';

  $.get(url, { region: region }, function (data) {
    $(".loading")[0].innerHTML = "";
    if (data.msg) {
      $(".messages")[0].innerHTML = `<p>${data.msg}</p>`;
    }
    else if (data.region && data.trends) {
      renderTrends(data.region, data.trends);
    }
    else {
      $(".messages")[0].innerHTML = `<p>Unknown Error. Please try again later.</p>`;
    }
  });
});

function renderTrends(region, trends) {
  $($('.container-md')[1]).prepend(`<h4 class='mx-auto mb-4 pb-2 text-center border-bottom' id='region-head'>Trending in <b>${region}</b></h4>`);
  for (i = 0; i < trends.length; i++) {
    addTrend(trends[i], i);
  }
  console.log($('#content'));
}

function addTrend(trend, i) {
  $('#content').append(Trend(trend, i));
}

const Trend = (trend, i) => {
  if (trend.tweet_volume) return (`<div class="card m-2 border-dark" style="width:20rem">
  <div class="card-body">
    <small class="text-muted">${i + 1}. Trending</small>
    <h5 class="card-title">${trend.name}</h5>
    <p class="card-text">${trend.tweet_volume} Tweets</p>
    <a href="${trend.url}" target=null class="card-link">See On Twitter</a>
  </div>
</div>`); else {
    return (`<div class="card m-2 border-dark" style="width:20rem">
    <div class="card-body">
      <small class="text-muted">${i + 1}. Trending</small>
      <h5 class="card-title">${trend.name}</h5>
      <a href="${trend.url}" target=null class="card-link">See On Twitter</a>
    </div>
  </div>`);
  }
};

