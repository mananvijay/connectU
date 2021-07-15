module.exports.home = function(req, res){
    //to see cookie
    // console.log(req.cookie);
    //to change cookie value
    // res.cookie('userid', 25);
    return res.render('home');
}