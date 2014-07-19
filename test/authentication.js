var Browser = require('zombie'),
    browser = new Browser(),
    assert = require('chai').assert;

// todo more tests

describe('authentication', function () {
    describe('login page should work', function () {
        it('should return 200', function (done) {
            browser.visit('http://localhost', function () {
                assert.equal(browser.statusCode, 200);
                done();
            })
        })
    })
});
