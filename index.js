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
    console.log('New game started. the word is: ' + game.getWord());

    res.send(jade.renderFile("./public/view/index.jade", {"wordLength": game.getWordLength()}));
});

io.on('connection', function(socket){
    socket.on('game.input.char', function(char) {
        game.setChar(char);

        io.emit(
            game.isRightChar() ? 'game.input.right_char' : 'game.input.wrong_char',
            {
                'occurrences': game.getCharOccurrences(),
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
