const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    }
    ,role:{
        type:String,
        enum:["normal","admin"]
    },
    password:{
        type:String,
        required:true
    }

})

const User= mongoose.model("User",UserSchema);

module.exports=User;