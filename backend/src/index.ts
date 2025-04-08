import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db' // Note: must end with `.js` for ES modules

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.json({
        msg: process.env.PORT
    })
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`⚙️ Server is running at port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGO DB connection failed!!!", err)
    })
