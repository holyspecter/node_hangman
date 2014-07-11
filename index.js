'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    logger = require('./modules/logger'),
    game = require('./controllers/game'),
    authentication = require('./controllers/authentication'),
    config = require('./config/config');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/auth', authentication.login);
app.get('/', game.main);

game.initListeners(io);

http.listen(config.port, function (){
    logger.trace('listening on *:' + config.port);
});
