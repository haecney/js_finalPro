const express=require('express')
const app=express()
const port=3000
app.use(express.static('16_game'))
app.get('/',(req,res)=>{
    res.sendFile('16_game/index.html',{root:__dirname})
})
app.listen(port,()=>{
    console.log("server running"+__dirname)
})