// todo password hashing and salting
module.exports = function () {
    var mongoose = require('mongoose'),
        UserSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        facebook_id: String
    });

    return mongoose.model('user', UserSchema);
};
