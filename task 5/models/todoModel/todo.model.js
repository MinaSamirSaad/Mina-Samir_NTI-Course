const mongoose = require('mongoose')
const today = new Date();
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};
const todoDB =mongoose.model('todos',{
    title: {
        type:String,
        required: true,
        trim:true,
        minLength:3,
        maxLength:20,
        unique:true
    },
    content:{
        type:String,
        required: true,
        trim:true,
        minLength:3,
        maxLength:50
    },
    status:{
        type:String,
        required: true,
        trim:true,
        enum:['In Progress','Completed']
    },
    finish:{
        type:Boolean,
        required: true,
    },
    date:{
        type:String,
        default:today.toLocaleDateString("ar-EG", options)
    }
})

module.exports = todoDB