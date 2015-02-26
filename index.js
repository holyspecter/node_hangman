'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    logger = require('./modules/logger'),
    game = require('./controllers/game'),
    authentication = require('./controllers/authentication'),
    config = require('./config/config'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(cookieParser('ovtsa'));
app.use(bodyParser());
app.use(session({
    secret: 'ovtsa',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// @todo make auth work
//app.get('/login', authentication.loginForm);
//app.post('/login', authentication.login);
//app.get('/logout', authentication.logout);

//app.get('/', authentication.checkLogin, game.main);
app.get('/', game.main);

game.initListeners(io);

http.listen(config.port, function (){
    logger.trace('listening on *:' + config.port);
});
