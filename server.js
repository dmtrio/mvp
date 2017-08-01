var express = require('express');
var morgan = require('morgan'); //logs requests
var browserify = require('browserify-middleware');
var babelify = require('babelify');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');

var apiKey = require('./app/apiKeys.js')
var db = require('./app/config.js');
var Models = require('./app/models/models')


var app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/bundle.js', browserify('./client/index.js', {
  transform: [[require('babelify'), {presets: ['es2015', 'react']}]]
}));

app.use(express.static(path.join(__dirname, '/client')));

// app.use('/styles.css', function(req, res, next) {
//   res.sendFile(path.join(__dirname, 'styles.css'));
// })

//moster function to save a link of articles to database

app.get('/news', function(req, res){
  var source = req.body.source;
  request(`https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=${apiKey.newsAPI}`, function (error, response, body) {
    var body = JSON.parse(body);

    function addLinks(article, articles, send){
      if(!article) {
        console.log(article, 'done');
        res.send(send);
        return;
      }
      Models.Link.findOne({link: article.url}).exec((err, link) => {
          if(!link) {
            console.log('link not found')
            var newLink =  new Models.Link({
              link: article.url
            })
            newLink.save(function(err, newLink) {
              if(err) {
                res.status(500).write(err);
              } else {
                addLinks(articles.pop(), articles, send);
              }
            });
          } else {
            console.log('found');
            addLinks(articles.pop(), articles, send)
          }
        });
    }
    addLinks(body.articles.pop(), body.articles.slice(), body.articles);
  });
});

app.get('/dbnews', function(req, res){
  Models.Link.find({}).then(links => {
    res.status(202).send(links);
  })
});

app.get('/dbusers', function(req, res){
  console.log('hello');
  Models.User.find({}).then(users => {
    res.status(202).send(users);
  })
});

app.post('/user', function(req, res){
  var username = req.body.username;
  var newUser = new Models.User({
    username: username
  })
  newUser.save(function(err, newUser) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(202).send(newUser);
    }
  })
})

// app.get('/users', function(req, res){
//   User.findAll().then(users => {
//     res.send(users);
//   })
// });

app.use(function(req, res, next) {
  res.status(404).send('404 - Page Not Found');
});

app.listen(4040, function() {
  console.log('Listening on port 4040');
})
