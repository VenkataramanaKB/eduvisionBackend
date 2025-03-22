const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: String,

    projects:[{type: Schema.Types.ObjectId, ref:'Project'}]
});     