module.exports = function () {
    var words = [
            'Kiev',
            'Moscow',
            'Paris'
        ],
        utils = require('./utils')(),
        gameModel = require('../models/Game')(),
        model,
        currentWord,
        givenChar,
        gameManager;

    gameManager = {
        init: function () {
            // todo randomize or anything else
            currentWord = words[0];
            // todo find existing games for user and use userId
            model = new gameModel({
                userId: 'test',
                word: currentWord
            });

            model.save(function (err) {
                if (err) console.log(err);
            });

            console.log(model);
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

                model.update(
                    {
                        state: state
                    },
                    {upsert: true},
                    function (err) {
                        if (err) console.log(err);
                    }
                );

                // todo check victory
            } else {
                failedChars.push(givenChar);
                model.update(
                    {
                        failedChars: failedChars
                    },
                    {upsert: true},
                    function (err) {
                        if (err) console.log(err);
                    }
                );

                // todo check loosing
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
        }
    };

    return {
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
