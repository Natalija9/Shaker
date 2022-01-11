const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cocktails: [{
        id: mongoose.Schema.Types.Number,
        name: mongoose.Schema.Types.String
    }]
})

const Favourites = mongoose.model('Favourites', favouritesSchema);

module.exports = Favourites;
