const mongoose = require('mongoose');
const Rating = require('../models/ratings');

const listAllRatings = async () => {
    const ratings = await Rating.find({}).exec();
    return ratings;
};

const getRating = async (id) => {
    const cocktail = await Rating.findOne({ cocktail_id: id }).exec();
    return cocktail.sum_of_ratings / cocktail.number_of_ratings;
};

const getCocktailById = async (id) => {
    const cocktail = await Rating.findOne({ cocktail_id: id }).exec();
    return cocktail;
};

const addNewRating = async (id, rating) => {
    const newRating = new Rating({
        _id: new mongoose.Types.ObjectId(),
        cocktail_id: id,
        number_of_ratings: 1,
        sum_of_ratings: rating
    });

    await newRating.save();
    return newRating;
};

const updateRating = async (id, rating) => {
    const updatedRating = await Rating.findOneAndUpdate(
        {cocktail_id : id },
        { $inc: {
            sum_of_ratings: rating ,
            number_of_ratings: 1
        } },
        { useFindAndModify: false}    
    ); 

    const newValue = await Rating.findOne({ cocktail_id: id }).exec();

    return newValue;
};

module.exports = {
    listAllRatings,
    getRating,
    getCocktailById,
    addNewRating,
    updateRating
};
