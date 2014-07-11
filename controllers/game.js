'use strict';

var app = require('express')(),
    http = require('http').Server(app),
    jade = require('jade'),
    game = require('../modules/game')(),
    logger = require('../modules/logger');

exports.main = function (req, res) {
    game.init()
        .then(function () {
            res.send(jade.renderFile("./public/view/index.jade", game.getPublicData()));
        })
        .done();
};

exports.initListeners = function (io) {
    io.on('connection', function(socket){
        socket.on('game.input.char', function(char) {
            var occurrences = game.execute(char),
                eventName = 'game.';

            if (game.isWin()) {
                eventName += 'win';
            } else if (game.isDefeat()) {
                eventName += 'defeat';
            } else {
                eventName += occurrences.length > 0 ? 'input.right_char' : 'input.wrong_char'
            }

            io.emit(
                eventName,
                {
                    'occurrences': occurrences,
                    'char': char
                }
            );
        });

        socket.on('disconnect', function(){
            logger.trace('user disconnected');
        });
    });
};
