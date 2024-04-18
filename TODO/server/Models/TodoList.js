const mongoose =require('mongoose');

const TodoListSchema= new mongoose.Schema({
    input: String,
    completed:{
        type:Boolean, 
        default:false
    },
    category:String
})

const TodoModel = mongoose.model('todos',TodoListSchema)
module.exports =TodoModel