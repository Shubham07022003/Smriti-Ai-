import express from 'express'

require('dotenv').config()
const app=express()


app.get("/",(req,res)=>{

    res.json({
        "msg":process.env.PORT
    })
})

app.listen(4000)