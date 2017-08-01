import $ from 'jquery';

const SERVER_URL = 'http://localhost:4040';

export const reactions = function(obj, callback) {
  console.log(obj);
  $.ajax({
    method: 'POST',
    url: `${SERVER_URL}/reactions`,
    data: JSON.stringify(obj),
    contentType: 'application/json',
    error: (err) => {
      console.log(err);
    },
    success: () => {
      callback();
    }

  })
}

export const reactionsCount = function(urlId, callback) {
  $.ajax({
    method: 'GET',
    url: `${SERVER_URL}/reactions?${urlId}`,
    error: (err) => {
      console.log(err);
    },
    success: (articles) => {
      callback(articles);
    }

  })
}
