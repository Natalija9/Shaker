const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: mongoose.Schema.Types.String,
        required: true  
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true  
    }, 
    age: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    favourites: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;
