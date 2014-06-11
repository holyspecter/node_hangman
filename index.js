"use strict";

var app = require('express')(),
    express = require('express'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    jade = require('jade'),
    game = require('./modules/game')();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
    game.init();
    res.send(jade.renderFile("./public/view/index.jade", {"wordLength": game.getWordLength()}));
});

io.on('connection', function(socket){
    socket.on('game.input.char', function(char) {
        var occurrences = game.execute(char),
            event = 'game.';

        console.log('Defeat:' + game.isDefeat());
        console.log('Win:' + game.isWin());
        if (game.isWin()) {
           event += 'win';
        } else if (game.isDefeat()) {
            event += 'defeat';
        } else {
            event += occurrences.length > 0 ? 'input.right_char' : 'input.wrong_char'
        }

        console.log(event);
        io.emit(
            event,
            {
                'occurrences': occurrences,
                'char': char
            }
        );
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
