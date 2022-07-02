const express = require ("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const users = [
    {
        "Name" : "UserOne",
        "Password" : "Password"
    }
]

app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users/signup', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.Password, 10)
        const user = {Name : req.body.Name, Password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch(err){
        res.status(500).send(err)
    }
})

app.post('/users/login', async (req, res)=>{
    const user = users.find(users => users.Name == req.body.Name)
    if (user == null){
        return res.status(400).send("User Not Find")
    } 
    try{
        if (await bcrypt.compare(req.body.Password, user.Password)){
            res.send("Success!!")
        } else {
            res.send("InValid")
        }
    }catch(err){
        res.status(500).send(err)
    }
})












app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`)
} )