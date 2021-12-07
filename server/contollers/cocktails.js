
const axios=require("axios").default;

const searchCocktailsByName = async (req,res,next) => {
    const name =req.params.cocktailName;
    console.log(name);

    try{
        if(name == undefined){
            const error=new Error('Cocktail name missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method : 'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/search.php',
        params:{
           "s" : name
        }

    };
    
    axios.request(options).then(function(response){
        // console.log(res);
        res.status(200).json(response.data);
        //console.log(response.headers);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
};

const searchCocktailsByFirstLetter = async (req,res,next) =>{
   const firstLetter = req.params.firstLetter;

   try{
    if(firstLetter == undefined){
        const error=new Error('First letter missing');
        error.status=400;
        throw error;
    }
    }catch(error){
    next(error);
    }

   const options = {
       method:'GET',
       url:'http://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
       params:{
           "f":firstLetter
       }
   };
   axios.request(options).then(function(response){
    res.status(200).json(response.data);
    //console.log(response.headers);
    }).catch(function(error){
    next(error);
    console.error(error);
    })
};

const searchIngredientByName = async (req,res,next) =>{
    const ingredientName = req.params.ingredientName;

    try{
        if(ingredientName == undefined){
            const error=new Error('Ingredient name missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/search.php',
        params :{
            "i" : ingredientName
        }
    }

    axios.request(options).then(function(response){
        res.status(200).json(response.data);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
 };


 const fullCocktailDetailsById = async (req,res,next) =>{
    const id=req.params.cocktailId;
 
    try{
        if(id == undefined){
            const error=new Error('Cocktail id missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/lookup.php',
        params :{
            "i" : id
        }
    }

    axios.request(options).then(function(response){
        res.status(200).json(response.data);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
 };


 const IngredientById = async (req,res,next) =>{
    const id=req.params.ingredientId;
 
    try{
        if(id == undefined){
            const error=new Error('Ingredient id missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/lookup.php',
        params :{
            "iid" : id
        }
    }

    axios.request(options).then(function(response){
        res.status(200).json(response.data);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
 };

 const searchCocktailsByIngredient = async (req,res,next) =>{
    const ingredient=req.params.ingredient;
    
    try{
        if(ingredient == undefined){
            const error=new Error('Ingredient name missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/filter.php',
        params :{
            "i" : ingredient
        }
    }

    axios.request(options).then(function(response){
        res.status(200).json(response.data);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
     
 };


 const filterByAlcoholic = async (req,res,next) =>{
    const alcohol=req.params.alcohol;
 
    try{
        if(alcohol == undefined || (alcohol!='Alcoholic' && alcohol!='Non_alcoholic')){
            const error=new Error('Alcoholic/Non_alcoholic or undefined');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/filter.php',
        params :{
            "a" : alcohol
        }
    }

    axios.request(options).then(function(response){
        res.status(200).json(response.data);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
 };

 const filterByCategory = async (req,res,next) =>{
    const category=req.params.category;
 
    try{
        if(category == undefined){
            const error=new Error('Category name missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/filter.php',
        params :{
            "c" : category
        }
    }

    axios.request(options).then(function(response){
        res.status(200).json(response.data);
    }).catch(function(error){
        next(error);
        console.error(error);
    })

 };

 const filterByGlass = async (req,res,next) =>{
    const glass=req.params.glass;
 
    try{
        if(glass == undefined){
            const error=new Error('Glass type missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }

    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/filter.php',
        params :{
            "g" : glass
        }
    }

    axios.request(options).then(function(response){
        res.status(200).json(response.data);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
 };

 module.exports={
    searchCocktailsByName,
    searchCocktailsByFirstLetter,
    searchIngredientByName,
    fullCocktailDetailsById,
    IngredientById,
    searchCocktailsByIngredient,
    filterByAlcoholic,
    filterByCategory,
    filterByGlass
};