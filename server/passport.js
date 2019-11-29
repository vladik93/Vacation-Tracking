var passport = require('express');
var con = require('./connection');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'username'}, function(username, password, done) {
            con.query(`SELECT * FROM users WHERE username=${username}`, function(err, user) {
                if(!user) {
                    return done(null, false, { message: 'The user is not registered'});
                }
                
                // Match Password
                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if(err) throw err;
                    
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password is incorrect'});
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        con.query(`SELECT * FROM users WHERE id=${id}`, function(err, user) {
            done(err, user);
        });
    });
};