const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home = function(req, res){
    Post.find({}).populate('user').
    populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec(function(err, post){
        if(err){
            console.log("error while rendering");
        }
        User.find({}, function(err, user){
            if(err){
                console.log("error while rendering");
            }
            res.render('home', {post:post, allUser: user});
        });
    });
}

