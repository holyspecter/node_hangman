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
        logger = require('./logger'),
        model,
        currentWord,
        givenChar,
        gameManager;

    gameManager = {
        MAX_FAILS: 3,
        isWin: false,
        isDefeat: false,
        init: function () {
            model = null;
            currentWord = null;

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
                        state.push({
                            index: occurrences[key],
                            char: givenChar
                        });
                    }
                }

                gameManager.isWin = gameManager.checkWin(state);
                model.state = state;
                model.isWin = gameManager.isWin;
                gameManager.saveModel();
            } else {
                failedChars.push(givenChar);
                gameManager.isDefeat = gameManager.checkDefeat(failedChars);
                model.failedChars = failedChars;
                model.isDefeat = gameManager.isDefeat;
                gameManager.saveModel();
            }

            return occurrences;
        },
        getPublicData: function () {
            return model
                ? {
                    "wordLength": currentWord.length,
                    "state": model.state,
                    "failedChars": model.failedChars
                  }
                : {};
        },
        getCharOccurrences: function () {
            return utils.findAllOccurrencesCharInString(currentWord, givenChar)
        },
        isRightChar: function () {
            return gameManager.getCharOccurrences() > 0;
        },
        checkDefeat: function (failedChars) {
            return  gameManager.MAX_FAILS <= failedChars.length;
        },
        checkWin: function (state) {
            return currentWord.length === state.length;
        },
        createNewGame: function () {
            currentWord = words[utils.random(0, 2)];
            gameManager.isWin = false;
            gameManager.isDefeat = false;
            model = new gameModel({
                userId: 'test',
                word: currentWord
            });

            gameManager.saveModel();

            return model;
        },
        saveModel: function () {
            model.save(function (err) {
                if (err) logger.error('Error while saving game:' + err.message);
            });
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
                        } else if (err) {
                            logger.error('Error while searching game: ' + err);
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
        getPublicData: function () {
            return gameManager.getPublicData();
        },
        isRightChar: function () {
            return gameManager.isRightChar();
        }
    };
};
