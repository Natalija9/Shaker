const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cocktails: [{
        cocktailId: mongoose.Schema.Types.Number,
        cocktailName: mongoose.Schema.Types.String
    }]
})

const Favourites = mongoose.model('Favourites', favouritesSchema);

module.exports = Favourites;
