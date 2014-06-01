/**
 * Created by rok on 6/1/14.
 */

var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    words = [
        'Kiev',
        'Moscow',
        'Paris'
    ],
    currentWord;

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    currentWord = words[0];
    console.log('New game started. the word is: ' + currentWord);

    io.emit('game.init_info', {
        'wordLength': currentWord.length
    });

    socket.on('game.input.char', function(char) {
        io.emit(-1 !== words[0].indexOf(char) ? 'game.input.right_char' : 'game.input.wrong_char');
        console.log('message: ' + char);
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
