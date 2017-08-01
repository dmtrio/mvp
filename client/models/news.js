import $ from 'jquery';

const SERVER_URL = 'http://localhost:4040';

export const loadNews = function(callback) {
  $.ajax({
    method: 'GET',
    url: `${SERVER_URL}/news`,
    success: news => {
      var news = JSON.parse(news);
      // console.log(news)
      callback(news);
    }
  })
}
