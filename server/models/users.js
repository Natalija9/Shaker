const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS=10;

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true  
    },
    hash: {
        type: mongoose.Schema.Types.String,
        required: true,
      },

    salt: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
    
    age: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    favourites: [mongoose.Schema.Types.String]
});


userSchema.methods.setPassword = async function (password) {
    this.salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.hash = await bcrypt.hash(password, this.salt);;
  };
  
  userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.hash);
  };
  

const User = mongoose.model('User', userSchema);

module.exports = User;
