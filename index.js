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
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
    currentWord = words[0];
    console.log('New game started. the word is: ' + currentWord);

    res.send(jade.renderFile("index.jade", {"wordLength": currentWord.length}));
});

io.on('connection', function(socket){
    socket.on('game.input.char', function(char) {
        var occurrences = findAllOccurrencesCharInString(currentWord, char) || [];

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

function findAllOccurrencesCharInString(string, char) {
    var occurrences = [],
        index = 0;

    string = string.toLowerCase();
    char = char.toLowerCase();

    while (-1 !== (index = string.indexOf(char, index))) {
        occurrences.push(index++);
    }
    return occurrences;
}

function random (low, high) {
    return Math.random() * (high - low) + low;
}
