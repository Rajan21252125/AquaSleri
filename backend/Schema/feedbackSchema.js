import mangoose from "mongoose";


const feedbackSchema = new mangoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
      type:String,
        required:true  
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const Feedback = mangoose.model('Feedback',feedbackSchema);
export default Feedback; 