var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var auth = require('./routes/auth');
var posts = require('./routes/posts');
var profiles = require('./routes/profiles');
var session = require('./session');

var app = express();

app.set('port', process.env.PORT || 4300);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static('../src')); //TODO: just a stub for experiments, should be changed later
//app.get('/', function(req,res) {
//  res.sendfile('../src/index.html');
//});

session.configure();
auth.configure(app);
app.all('*', session.ensureAuthenticated);
posts.configure(app);
profiles.configure(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});