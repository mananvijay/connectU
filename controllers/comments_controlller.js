const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log('error while checking post id');
        }
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: post
            }, function(err, comment){
                if(err){
                    console.log("error while add comment");
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }
    })
}

module.exports.destory = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            'error while deleting a comment';
            return;
        }
        if(req.user.id == comment.user){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }   
    });
}