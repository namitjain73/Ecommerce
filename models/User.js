const { required } = require('joi');
const mongoose = require('mongoose');
const passportlocalmangoose = require('passport-local-mongoose')
const userschema = new mongoose.Schema({
    email : {
        type : String,
        trim : true,
        required:true
    },
    role:{
        type:String,
        required:true
    },

    cart :[

        {
            type:  mongoose.Schema.Types.ObjectId,
            ref:  'Product'
        }
    ]
})


// plugin lagega model se phele or schema ke baad
userschema.plugin(passportlocalmangoose);
// now we want to also make routes

let User = mongoose.model('User',userschema);
module.exports = User;