const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
passport.use(new LocalStrategy({
    usernameField: 'email'},
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log("Error checking email");
                return done(err);
            }
            if(!user || password != user.password){
                console.log('invalid username');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done){
     done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error while finding user');
            return done(err);
        }
        return done(null, user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains current signed in 
        //user from the cookie and we are sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}