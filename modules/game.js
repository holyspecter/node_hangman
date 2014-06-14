module.exports = function () {
    "use strict";

    var words = [
            'Kiev',
            'Moscow',
            'Paris'
        ],
        utils = require('./utils')(),
        gameModel = require('../models/Game')(),
        Q = require('q'),
        model,
        currentWord,
        givenChar,
        gameManager;

    gameManager = {
        MAX_FAILS: 3,
        isWin: false,
        isDefeat: false,
        init: function () {
            return gameManager.findExistingGame()
                .then(function () {
                    model = model || gameManager.createNewGame();
                });
        },
        getChar: function () {
            return givenChar;
        },
        execute: function (char) {
            var occurrences,
                state = model.state,
                failedChars = model.failedChars,
                key;

            givenChar = char;
            occurrences = gameManager.getCharOccurrences();

            if (occurrences.length > 0) {
                for (key in occurrences) {
                    if (occurrences.hasOwnProperty(key)) {
                        state[occurrences[key]] = givenChar;
                    }
                }

                gameManager.isWin = gameManager.checkWin(state);
                gameManager.updateModel({
                    state: state,
                    isWin: gameManager.isWin
                });
            } else {
                failedChars.push(givenChar);
                gameManager.isDefeat = gameManager.checkDefeat(failedChars);
                gameManager.updateModel({
                    failedChars: failedChars,
                    isDefeat: gameManager.isDefeat
                });
            }

            return occurrences;
        },
        getWordLength: function () {
            return currentWord.length;
        },
        getCharOccurrences: function () {
            return utils.findAllOccurrencesCharInString(currentWord, givenChar)
        },
        isRightChar: function () {
            return gameManager.getCharOccurrences() > 0;
        },
        checkDefeat: function (failedChars) {
            return  gameManager.MAX_FAILS === failedChars.length;
        },
        checkWin: function (state) {
            return currentWord.length === state.length;
        },
        updateModel: function (data) {
            model.update(
                data,
                {upsert: true},
                function (err) {
                    // todo error logging
                    if (err) console.log(err);
                }
            )
        },
        createNewGame: function () {
            // todo randomize or anything else
            console.log('creates');
            currentWord = words[0];
            gameManager.isWin = false;
            gameManager.isDefeat = false;
            model = new gameModel({
                userId: 'test',
                word: currentWord
            });

            model.save(function (err) {
                if (err) console.log(err);
            });

            return model;
        },
        findExistingGame: function () {
            return Q.fcall(function () {
                return gameModel
                    .find({ userId: 'test' })
                    .where('isWin').equals(false)
                    .where('isDefeat').equals(false)
                    .exec(function (err, obj) {
                        if (!err && obj[0]) {
                            model = obj[0];
                            currentWord = model.word;
                        } else {
                            // todo error logging
                            console.log(err);
                        }
                        return model;
                    });
            });

        }
    };

    return {
        isWin: function() {
            return gameManager.isWin;

        },
        isDefeat: function () {
            return gameManager.isDefeat;
        },
        init: function () {
            return gameManager.init();
        },
        getChar: function () {
            return gameManager.getChar();
        },
        execute: function (char) {
            return gameManager.execute(char);
        },
        getWordLength: function () {
            return gameManager.getWordLength();
        },
        getCharOccurrences: function () {
            return gameManager.getCharOccurrences();
        },
        isRightChar: function () {
            return gameManager.isRightChar();
        }
    };
};
