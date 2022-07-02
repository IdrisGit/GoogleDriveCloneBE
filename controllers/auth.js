const User = require('../models/User')

exports.register = async (req, res ,next) =>{
    const{name, email, password} = req.body

    try{
        const user = await User.create({
            name,
            email,
            password
        }) 
       sendToken(user, 201, res)
    }catch(err){
        res.status(500).send(err)
    }
};

exports.login = async (req, res ,next) =>{
    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({success : false, error: "Please Provide Email and Passwor"})
    }
    try{
        const user = await User.findOne({email}).select('+password')

        if(!user){
            res.status(404).json({success:false, error: 'Invalid Credentials'})
        }

        const isValid = await user.matchPasswords(password)

        if(!isValid){
            res.status(404).json({success:false, error:"Invalid Credentials"})
        }

        sendToken(user, 200, res)
    }catch(err){
        res.status(500).send(err)
    }
};


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success : true, token})
}