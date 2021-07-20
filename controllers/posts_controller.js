const Post = require('../models/posts');
const Comment = require('../models/comments');
const passport = require('passport');

module.exports.uploadPost = async function(req, res){
    if(req.isAuthenticated()){
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: 'Post created'
            });
        }
            req.flash('success', 'Post Uploaded');
            res.redirect('back');
    }else{
        res.redirect('back');
    }
}

module.exports.distroy = async function(req, res){
    try{
        let posts = await Post.findById(req.params.id);
        if(posts.user == req.user.id){
            posts.remove();
            let comment = await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    }, message: 'Post deleted successfully'
                })
            }
            req.flash('error', 'Post Removed');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }        
    }catch(err){
        req.flash('error', err);
    }
    // Post.findById(req.params.id, function(err, post){
    //     if(post.user == req.user.id){
    //         post.remove();
    //         Comment.deleteMany({post: req.params.id}, function(err){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
}


