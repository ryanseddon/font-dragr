
// Needed because node was looking in wrong directory for modules
require.paths.unshift('../../lib/node_modules');

/**
 * Module dependencies.
 */
 
var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
    layout: !req.xhr
  });
});

app.get('/editor', function(req, res){
  res.render('editor', {
    layout: !req.xhr
  });
});

app.get('/gallery', function(req, res){
  res.render('gallery', {
    layout: !req.xhr
  });
});


app.listen(45995);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
