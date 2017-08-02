var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/newsAggregatorDB2', { server: {reconnectTries: Number.MAX_VALUE} });
var db = mongoose.connection;




db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('MongoDB connection is open')
});

module.exports = db;

// });

//define schemmas
