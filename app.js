
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
  res.header("Access-Control-Allow-Origin", "*");
  res.render('index', {
    layout: !req.xhr
  });
});

app.get('/editor', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('editor', {
    layout: !req.xhr
  });
});

app.get('/gallery', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('gallery', {
    layout: !req.xhr
  });
});

// Default gallery route
/*app.get('/gallery/:font', function(req, res){
  if(!req.xhr) {
    res.render('gallery');
  }
});

app.get('/gallery/:font/:style', function(req, res){
  if(!req.xhr) {
    res.render('gallery');
  }
});

app.get("/fd.appcache", function(req, res){
  res.header("Content-Type", "text/cache-manifest");
  res.end("CACHE MANIFEST");
});*/


app.listen(45995);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
