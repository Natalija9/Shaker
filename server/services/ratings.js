const mongoose = require('mongoose');
const Rating = require('../models/ratings');

const listAllRatings = async () => {
    const ratings = await Rating.find({}).exec();
    return ratings;
};

const getRating = async (id) => {
    const cocktail = await Rating.findOne({ cocktail_id: id }).exec();
    if(cocktail === null){
        return 0;
    }
    const num = cocktail.sum_of_ratings / cocktail.number_of_ratings;
    return Math.round(num * 100) / 100;
};

const getCocktailById = async (id) => {
    const cocktail = await Rating.findOne({ cocktail_id: id }).exec();
    return cocktail;
};

const addNewRating = async (id, rating, username) => {
    const newRating = new Rating({
        _id: new mongoose.Types.ObjectId(),
        cocktail_id: id,
        number_of_ratings: 1,
        sum_of_ratings: rating,
        users: username
    });

    await newRating.save();
    const num = newRating.sum_of_ratings / newRating.number_of_ratings;
    return Math.round(num * 100) / 100;

};

const updateRating = async (id, rating, username) => {
    const updatedRating = await Rating.findOneAndUpdate(
        {cocktail_id : id },
        { $inc: {
            sum_of_ratings: rating ,
            number_of_ratings: 1
            },
             $push: {users: username} 
        },
        { useFindAndModify: false}    
    ); 

    const newRating = await Rating.findOne({ cocktail_id: id }).exec();
    const num = newRating.sum_of_ratings / newRating.number_of_ratings;
    return Math.round(num * 100) / 100;
    
};

const checkUsername = async (id, username) => {
    const cocktail = await Rating.findOne({ cocktail_id: id, users: username }).exec();
    
    return cocktail;
};

const getRatedCocktails = async (username) => {
    let cocktails = await Rating.find({users: username}).exec();
    cocktails = cocktails.map(x => x.cocktail_id);
    return cocktails;
}


  
module.exports = {
    listAllRatings,
    getRating,
    getCocktailById,
    addNewRating,
    updateRating,
    checkUsername,
    getRatedCocktails
};
