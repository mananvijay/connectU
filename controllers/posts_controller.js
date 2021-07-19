const Post = require('../models/posts');
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


