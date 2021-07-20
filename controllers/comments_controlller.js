const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: post
            });
            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment added');
            return res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.destory = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(req.user.id == comment.user){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}});
            req.flash('error', 'Comment Removed');
                return res.redirect('back');
        }else{
            return res.redirect('back');
        }  
    }catch(err){
        console.log('Error', err);
        return;
    }
}