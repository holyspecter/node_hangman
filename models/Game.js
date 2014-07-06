module.exports = function () {
    var mongoose = require('mongoose'),
        schema;

    mongoose.set('debug', true);

    mongoose.connect('mongodb://localhost/hangman');
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    schema = new mongoose.Schema({
        userId: String,
        word: String,
        state: [ new mongoose.Schema({
            index: Number,
            char: String
        }, { _id: false })],
        failedChars: { type: Array, "default": [] },
        isWin: { type: Boolean, "default": false },
        isDefeat: { type: Boolean, "default": false }
    });

    return mongoose.model('Game', schema);
};
