var Browser = require('zombie'),
    browser = new Browser(),
    assert = require('chai').assert;

describe('game', function () {
    describe('game page should work', function () {
        it ('should return 200', function (done) {
            browser.visit('http://localhost:3000/', function () {
                assert.equal(browser.statusCode, 200);
                done();
            });
        });
    });
});
