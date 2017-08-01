var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/newsAggregatorDB', { server: {reconnectTries: Number.MAX_VALUE} });
var db = mongoose.connection;

// var promise = mongoose.connect('mongodb://localhost/newsAggregatorDB', {
//   useMongoClient: true,
// })
// promise.then(function(db) {
//   console.log('MongoDB promise');
//   connection.openUri('mongodb://localhost/newsAggregatorDB')



db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('MongoDB connection is open')
});

module.exports = db;

// });

//define schemmas
