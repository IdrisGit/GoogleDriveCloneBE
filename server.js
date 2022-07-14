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