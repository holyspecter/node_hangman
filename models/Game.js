module.exports = function () {
    var mongoose = require('mongoose'),
        schema;

    mongoose.connect('mongodb://localhost/hangman');
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    schema = new mongoose.Schema({
        userId: String,
        word: String,
        state: { type: Array, "default": [] },
        failedChars: { type: Array, "default": [] }
    });

    return mongoose.model('Game', schema);
};
