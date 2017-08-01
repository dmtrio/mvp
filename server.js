var express = require('express');
var morgan = require('morgan'); //logs requests
var browserify = require('browserify-middleware');
var babelify = require('babelify');
var bodyParser = require('body-parser');
var urlParser = require('url-parse')
var path = require('path');
var request = require('request');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var keys = require('./app/keys.js')
var db = require('./app/config.js');
var Models = require('./app/models/models')


var app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/bundle.js', browserify('./client/index.js', {
  transform: [[require('babelify'), {presets: ['es2015', 'react']}]]
}));

app.use(express.static(path.join(__dirname, '/client')));

app.get('/stlyes.css', function(req, res){
  res.sendFile(path.join(__dirname, 'styles.css'));
});
// app.use('/styles.css', function(req, res, next) {
//   res.sendFile(path.join(__dirname, 'styles.css'));
// })

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/auth/facebook')
  }
    // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
};


var FACEBOOK_APP_ID = keys.FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = keys.FACEBOOK_APP_SECRET;

passport.serializeUser(function(user, done) {
  console.log('serial user', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4040/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    Models.User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      console.log('callllllllllback', cb);
      return cb(err, user);
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


//moster function to save a link of articles to database

app.get('/news', function(req, res){
  var source = req.body.source;
  request(`https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=${keys.newsAPI}`, function (error, response, body) {
    var body = JSON.parse(body);
    var send = []

    function addLinks(article, articles, send){
      if(!article) {
        console.log(article, 'done');
        send = JSON.stringify(send);
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
                article._id = newLink._id;
                send.push(article);
                addLinks(articles.pop(), articles, send);
              }
            });
          } else {
            console.log('found');
            article._id = link._id;
            send.push(article);
            addLinks(articles.pop(), articles, send)
          }
        });
    }
    addLinks(body.articles.shift(), body.articles, send);
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

app.post('/reactions', function(req, res){
  var userId = req.body.userId;
  var urlId = req.body.urlId;
  var reaction = req.body.reaction;
  console.log('here', req.body);

  Models.Link.findOne({_id: urlId}).then(link => {
    var updateReaction = link[reaction]
    var index = updateReaction.indexOf(userId);
    if (index === -1) {
      updateReaction.push(userId);
    } else {
      updateReaction.splice(index, 1);
    }
    link.save()
  });

  Models.User.findOne({_id: userId}).then(user => {
    var updateReaction = user[reaction]
    var index = updateReaction.indexOf(urlId);
    if (index === -1) {
      updateReaction.push(urlId);
    } else {
      updateReaction.splice(index, 1);
    }
    user.save()
    res.send();
  });
});

app.get('/reactions', function(req, res) {
    var parsedUrl = urlParser(req.url).query.slice(1);
    Models.Link.findOne({_id: parsedUrl})
    .catch (err => {
      console.log(err);
    })
    .then(link => {
      res.send(link);
    })
})

// app.post('/user', function(req, res){
//   var username = req.body.username;
//   var newUser = new Models.User({
//     username: username
//   })
//   newUser.save(function(err, newUser) {
//     if(err) {
//       res.status(500).send(err);
//     } else {
//       res.status(202).send(newUser);
//     }
//   })
// })


app.use(function(req, res, next) {
  res.status(404).send('404 - Page Not Found');
});

app.listen(4040, function() {
  console.log('Listening on port 4040');
})
