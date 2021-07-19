const Post = require('../models/posts');
const Comment = require('../models/comments');
const passport = require('passport');

module.exports.uploadPost = function(req, res){
    if(req.isAuthenticated()){
        Post.create({
            content: req.body.content,
            user: req.user._id
        }, function(err, post){
            if(err){
                console.log("error while uploading");
                return;
            }
            res.redirect('back');
        });
    }else{
        res.redirect('back');
    }
}

module.exports.distroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}


