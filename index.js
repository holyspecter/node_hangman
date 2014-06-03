/**
 * Created by rok on 6/1/14.
 */

var app = require('express')(),
    express = require('express'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    jade = require('jade'),
    words = [
        'Kiev',
        'Moscow',
        'Paris'
    ],
    currentWord;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    currentWord = words[0];
    console.log('New game started. the word is: ' + currentWord);

    res.send(jade.renderFile("index.jade", {"wordLength": currentWord.length}));
});

io.on('connection', function(socket){
    socket.on('game.input.char', function(char) {
        var occurences = words[0].search(char) || [];

//        todo all occurences of the char

        io.emit(
            occurences !== -1 ? 'game.input.right_char' : 'game.input.wrong_char',
            {
                'occurences': occurences,
                'char': char
            }
        );
        console.log('message: ' + words[0].indexOf(char));
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

function random (low, high) {
    return Math.random() * (high - low) + low;
}
