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
        var occurrences = game.execute(char);

        io.emit(
            occurrences.length > 0 ? 'game.input.right_char' : 'game.input.wrong_char',
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
