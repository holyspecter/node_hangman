var assert = require('chai').assert,
    utils = require('../modules/utils')();

describe('Utilities', function () {
    describe('#random()', function () {
        it ('should return random integer', function () {
            assert.isNumber(utils.random(0, 100));
        });
    });
    describe('#findAllOccurrencesCharInString()', function () {
        it('should find all char occurrences', function () {
            var result = utils.findAllOccurrencesCharInString('Big tits', 'i');

            assert.isArray(result);
            assert.lengthOf(result, 2);
        }),
        it('should ignore case', function () {
            assert.lengthOf(
                utils.findAllOccurrencesCharInString(
                    'Semi-final, first semifinal of FIFA WorldCup-2014 was awesome.',
                    'a'
                ),
                5
            );
        }),
        it('should return array of indexes', function () {
            var result = utils.findAllOccurrencesCharInString('hasta la vista', 's'),
                i;

            for (i = 0; i < result.length; i++) {
                assert.isNumber(result[i]);
            }
        });
    });
});
