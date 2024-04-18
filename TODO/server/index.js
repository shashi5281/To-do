const express =require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const TodoModel =require('./Models/TodoList')

const app =express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/efficiency')
app.post('/add',(req,res) => {
    console.log("data" , req.body)
    const input =req.body.input;
    const category=req.body.category;
    TodoModel.create({
        input:input,
        category:category
    }).then(result => {
        res.json({message : "Todo added"})
    })
    .catch(err => res.json(err))
})


app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result =>res.json(result))
    .catch(err => res.json(err))
})


app.put('/update/:id',(req,res)=>{
    const {id} =req.params;
    TodoModel.findByIdAndUpdate({_id:id},{completed:true})
    .then(result =>res.json(result))
    .catch(err => res.json(err))
})


app.delete('/delete/:id',(req,res)=>{
    const {id} =req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result =>res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, ()=>{
    console.log('Serving is Running on Port 3001')
})