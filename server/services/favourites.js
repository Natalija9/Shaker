const Favourites = require('../models/favourites');

const getFavourites = async (username) => {
    const user = await Favourites.findOne({ username: username }).exec();
    if(user === null)
      return [];
    
    return user.cocktails;
  }
  
const addToFavourites = async (username, id, name) => {
  await Favourites.findOneAndUpdate(
    {username : username},
    {$push: {cocktails: {
      id : id,
      name : name
    }}},
    { useFindAndModify: false }
  );
  
  const newFave = await Favourites.findOne({username : username}).exec();
  if(newFave === null)
    return null;
  return newFave.cocktails;
};

const createNewFavourites = async (username, id, name) => {
  const newFave = new Favourites({
    username : username,
    cocktails: {
      id : id,
      name : name
    }
});

await newFave.save();
return newFave.cocktails;

}

const removeFromFavourites = async (username, id) => {
  console.log("servis ", username, id);

await Favourites.findOneAndUpdate(
  { username : username }, 
  { $pull: { cocktails: { id: id} } },
);

const data = await Favourites.findOne({username : username}).exec();
console.log("servis ", data);
return data.cocktails;
}


module.exports = {
    getFavourites,
    addToFavourites,
    createNewFavourites,
    removeFromFavourites
}