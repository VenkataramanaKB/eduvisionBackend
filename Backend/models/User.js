const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    linkedin: String,

    github: String,

    gfg: String,

    codeforce: String,

    codechef: String,

    x: String,

    reddit: String,



    projects:[{type: Schema.Types.ObjectId, ref:'Project'}]


},{timestamps: true });

module.exports=mongoose.model('User',userSchema);