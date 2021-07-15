const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile');
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up');
}

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in');
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.cnfpassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error occurred while finding the user');
        }

        if(!user){
            User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }, function(err, user){
                if(err){
                    console.log('Cannot create a user');
                    return;
                }
                return res.redirect('./sign-in');
            });
        }else{
            return res.redirect('Already exisiting email entered')
        }
    });


}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.sessionDistroy = function(req, res){
    req.logout();
    return res.redirect('/');
}