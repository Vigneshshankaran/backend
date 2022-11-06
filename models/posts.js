const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name:{
        type: String
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    zip:{
        type: String
    },
    country:{
        type: String
    },
    email:{
        type: String
    },
    position:{
        type: String
    },
    website:{
        type: String
    },
    photo:{
        type: String
    },
    skill:{
        type: String
    },
    bio:{
        type: String
    },

    
});

module.exports = mongoose.model('Posts', PostSchema)