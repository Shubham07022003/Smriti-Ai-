import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db' // Note: must end with `.js` for ES modules
import { Router } from 'express'
import signup from './controllers/signup'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.json({
        msg: process.env.PORT
    })
})
app.post("/signup",signup)
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`⚙️ Server is running at port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGO DB connection failed!!!", err)
    })
