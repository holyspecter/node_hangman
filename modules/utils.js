module.exports = function () {
    var utils;

    utils = {
        findAllOccurrencesCharInString: function (string, char) {
            var occurrences = [],
                index = 0;

            string = string.toLowerCase();
            char = char.toLowerCase();

            while (-1 !== (index = string.indexOf(char, index))) {
                occurrences.push(index++);
            }
            return occurrences;
        },
        random: function (low, high) {
            return Math.random() * (high - low) + low;
        }
    };

    return {
        findAllOccurrencesCharInString: function (string, char) {
            return utils.findAllOccurrencesCharInString(string, char);
        },
        random: function random (low, high) {
            return utils.random(low, high);
        }
    };
};
