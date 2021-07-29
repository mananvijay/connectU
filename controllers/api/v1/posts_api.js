const Post = require('../../../models/posts');
const User = require('../../../models/user');
const Comment = require('../../../models/comments');
module.exports.index = async function(req, res){
    
    let post = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    return res.json(200, {
        message: 'List of posts',
        posts: post
    });
}


module.exports.distroy = async function(req, res){
    try{
        let posts = await Post.findById(req.params.id);
        if(posts.user == req.user.id){
            posts.remove();
            await Comment.deleteMany({post: req.params.id});
            // req.flash('error', 'Post Removed');
            // return res.redirect('back');
            return res.json(200, {
                message: 'post and associated comments deleted successfully'
            });
        }else{
            return res.json(401, {
                message: 'You cannot delete this post'
            });
        }  
    }catch(err){
        // req.flash('error', err);
        console.log("Error", err);
        return res.json(500, {
            message: 'Internal Server error'
        });
    }
}

