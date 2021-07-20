const User = require('../models/user');
const Posts = require('../models/posts');
module.exports.profile = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            pu: user
            });
    }catch(err){
        console.log("Error", err);
    }
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        let user = await User.findByIdAndUpdate(req.params.id, req.body);
        req.flash('success', 'Details Updated');
            return res.redirect('back');
    }else{
        req.flash('error', 'Unauthorized to update');
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

module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.cnfpassword){
            req.flash('error', "Password doesn't match");
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            let crte = await User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            });
            req.flash('success', 'Account Registered');
            return res.redirect('./sign-in');
        }
    }catch(err){
        console.log('Error occurred while finding the user');
    }
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){
    //         console.log('Error occurred while finding the user');
    //     }

    //     if(!user){
    //         User.create({
    //             email: req.body.email,
    //             password: req.body.password,
    //             name: req.body.name
    //         }, function(err, user){
    //             if(err){
    //                 console.log('Cannot create a user');
    //                 return;
    //             }
    //             return res.redirect('./sign-in');
    //         });
    //     }else{
    //         return res.redirect('Already exisiting email entered')
    //     }
    // });


}

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.sessionDistroy = function(req, res){
    req.flash('success', 'Logged Out Successfully');
    req.logout();
    return res.redirect('/');
}