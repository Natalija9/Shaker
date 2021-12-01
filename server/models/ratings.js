const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cocktail_id: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    number_of_ratings: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    sum_of_ratings: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
    
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
