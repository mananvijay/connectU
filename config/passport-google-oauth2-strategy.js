const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID: '208825939165-rrph1trovfar0d9fktst5tpa9fc9mm1q.apps.googleusercontent.com',
    clientSecret: 'egvs1NaeY9gEqPrAs_wi7GAi',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
},

function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log('error in google strategy passport', err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            return User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log('error in creating user', err);
                    return;
                }
                return done(null, user);
            })
        }
    });
}

));

module.exports = passport;