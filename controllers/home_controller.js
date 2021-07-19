const Post = require('../models/posts');
module.exports.home = function(req, res){
    Post.find({}, function(err, post){
    });

    Post.find({}).populate('user').exec(function(err, post){
        if(err){
            console.log("error while rendering");
        }
        res.render('home', {post:post});
    });
}

