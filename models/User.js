const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Please Provide Name'],
    },
    email:{
        type: String,
        required: [true, 'Please Provide Email'],
        unique: true,
        match : [ 
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        , 'Please Provide Valid Email' 
    ],
    },
    password: {
       type: String,
        required: [true, 'Please Provide A Password'],
        minlength: 6,
        select: false,
    }
})


UserSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User;