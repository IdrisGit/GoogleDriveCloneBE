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
            next()
        }
};

exports.login = async (req, res ,next) =>{
    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({success : false, error: "Please Provide Email and Password"})
    }
    try{
        const user = await User.findOne({email}).select('+password')

        if(!user){
            res.status(404).json({success:false, error: 'Invalid Credentials'})
        }

        const isValid = await user.matchPasswords(password)

        if(!isValid){
            res.status(401).json({success:false, error:"Invalid Credentials"})
        }

        sendToken(user, 200, res)
    }catch(err){
        res.status(500).send(err)
        next()
    }
};

exports.deleteUser = async (req, res, next) => {
    const{email} = req.params
    try{
        User.findOneAndDelete({email : email}, (err) => {
            if(err){
                res.send(err)
            } res.send("Deleted")
        })
    } catch(err){
        res.status(500).send(err)
        next()
    }
}

exports.updateUser = async (req, res, next) => {
    const{name, email, password} = req.body
    const update = {name: name}
    const filter = {email: req.params.email}

    try{
        let updatedUser = await User.findOneAndUpdate(filter, update, {new: true})
        res.status(200).send(updatedUser)


    } catch(err){
        res.status(500).send(err)
        next()
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    updateTokenDatabase(token, user.email, res)
    res.status(statusCode).json({success : true, token})
}

const updateTokenDatabase = async(token, email) => {
    const update = {token: token}
    const filter = {email: email}
    await User.findOneAndUpdate(filter, update, {new: true})
}