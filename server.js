var app = require('./app');
var port = process.env.PORT || 2010;

var server = app.listen(port, function() {
  console.log(new Date().toISOString()+'Express server listening on port ' + port);
});