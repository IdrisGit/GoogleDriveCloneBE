const User = require("../models/User");

exports.getPrivateData = (req, res ,next) => {
    res
    .status(200)
    .json({
        success : true,
        data : "You Have Acces"
    });
};

exports.getProfile = async(req, res, next) => {
   await User.find({'email' : req.params.email}, 'name',function(err, user){
        if(!err) {
            res.status(200).send(user)
        } else {
            console.log(err)
            next()
        }
    }).clone().catch(function(err){ console.log(err)})
};