const User = require('../models/user');
const Posts = require('../models/posts');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('ooops, not working');
            return;
        }
            return res.render('user_profile', {
                pu: user
            });
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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