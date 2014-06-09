module.exports = function () {
    var words = [
            'Kiev',
            'Moscow',
            'Paris'
        ],
        utils = require('./utils')(),
        currentWord,
        givenChar,
        gameManager;

    gameManager = {
        init: function () {
            // todo randomize or anything else
            currentWord = words[0];
        },
        // todo move to model
        setChar: function (char) {
            givenChar = char;
        },
        getChar: function () {
            return givenChar;
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
        setChar: function (char) {
            return gameManager.setChar(char);
        },
        getChar: function () {
            return gameManager.getChar();
        },
        getWordLength: function () {
            return gameManager.getWordLength();
        },
        getWord: function () {
            // todo remove after migration
            return currentWord;
        },
        getCharOccurrences: function () {
            return gameManager.getCharOccurrences();
        },
        isRightChar: function () {
            return gameManager.isRightChar();
        }
    };
};
