'use strict';

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy,
    jade = require('jade'),
    User = require('../models/User')();

// todo cleanup after auth will be ready

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // todo password verification
//            if (!user.validPassword(password)) {
//                return done(null, false, { message: 'Incorrect password.' });
//            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize');
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports.loginForm = function (req, res) {
    res.send(jade.renderFile('./view/login.jade'));
};

module.exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

module.exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

module.exports.checkLogin = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
