const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home = async function(req, res){

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    
    let user = await User.find({}); 
    res.render('home', {
        post:posts, allUser: user
    });

    }catch(err){
        console.log("Error", err);
        return;
    }
    
    // .exec(function(err, post){
    //     if(err){
    //         console.log("error while rendering");
    //     }
    //     User.find({}, function(err, user){
    //         if(err){
    //             console.log("error while rendering");
    //         }
            
    //     });
    // });
}

