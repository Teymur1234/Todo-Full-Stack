import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})

const todoModel = mongoose.model('todo',todoSchema)

export default todoModel