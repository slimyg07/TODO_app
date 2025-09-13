import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        // required : 
    }

}, {timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;