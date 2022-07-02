require('dotenv').config()
const express = require ("express")
const cors = require("cors")
const connectDB = require("./config/db")


const app = express()
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))



app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`)
})

// app.get('/users', (req, res) => {
//     res.send(users)
// })

// app.post('/users/signup', async (req, res) => {
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.Password, 10)
//         const user = {Name : req.body.Name, Password: hashedPassword}
//         users.push(user)
//         res.status(201).send()
//     } catch(err){
//         res.status(500).send(err)
//     }
// })

// app.post('/users/login', async (req, res)=>{
//     const user = users.find(users => users.Name == req.body.Name)
//     if (user == null){
//         return res.status(400).send("User Not Find")
//     } 
//     try{
//         if (await bcrypt.compare(req.body.Password, user.Password)){
//             res.send("Success!!")
//         } else {
//             res.send("InValid")
//         }
//     }catch(err){
//         res.status(500).send(err)
//     }
// })