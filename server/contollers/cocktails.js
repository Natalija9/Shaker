const axios = require("axios").default;

const searchCocktails = async (req,res,next) => {
    const name =req.params.value;

    try{
        if(name == undefined){
            const error=new Error('Cocktail name missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }
    
    const options1 = {
        method : 'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/search.php',
        params:{
            "s" : name
        }
    };
    
    
    const options2 = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/filter.php',
        params :{
            "i" : name
        }
    }
    
    
    const req1 = axios.request(options1);
    const req2 = axios.request(options2);
    
    axios.all([req1, req2]).then(axios.spread(function(response1, response2){
        
        let data = response1.data["drinks"].concat(response2.data["drinks"]);
        data = formatDrinks(data);
        
        res.status(200).json(data);
    })).catch(function(error){
        next(error);
        console.error(error);
    }
    )
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
        let newData = formatDrinks(response.data["drinks"]);
        res.status(200).json(newData[0]);
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
        let newData = formatIngredient(response.data["ingredients"]);
        res.status(200).json(newData);
        
    }).catch(function(error){
        next(error);
        console.error(error);
    })
};

const filterByAlcoholic = async (req,res,next) =>{
    const alcohol=req.params.alcohol;
    
    try{
        if(alcohol == undefined || (alcohol!='Alcoholic' && alcohol!='Non alcoholic' && alcohol != 'Optional alcohol')){
            const error=new Error('Alcoholic/Non alcoholic or undefined');
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
        let newData = formatDrinks(response.data["drinks"])
        res.status(200).json(newData);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
};

const filterByCategory = async (req,res,next) =>{
    let category=req.params.category;
    
    try{
        if(category == undefined){
            const error=new Error('Category name missing');
            error.status=400;
            throw error;
        }
    }catch(error){
        next(error);
    }
    
    category = category.replace(/ /g, ' / ');
    
    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/filter.php',
        params :{
            "c" : category
        }
    }
    
    axios.request(options).then(function(response){
        let newData = formatDrinks(response.data["drinks"]);
        res.status(200).json(newData);
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
        let newData = formatDrinks(response.data["drinks"])
        res.status(200).json(newData);
    }).catch(function(error){
        next(error);
        console.error(error);
    })
};

const randomCocktail = async (req,res,next) => {
    
    const options = {
        method:'GET',
        url:'http://www.thecocktaildb.com/api/json/v1/1/random.php'
    }
    
    let data = [];
    
    const req1 = axios.request(options);
    const req2 = axios.request(options);
    const req3 = axios.request(options);
    
    axios.all([req1, req2, req3]).then(axios.spread(function(response1, response2, response3){
        
        data1 = formatDrinks(response1.data["drinks"]);
        data2 = formatDrinks(response2.data["drinks"]);
        data3 = formatDrinks(response3.data["drinks"]);
        data = (data1.concat(data2)).concat(data3);
        
        res.status(200).json(data);
    })).catch(function(error){
        console.error(error);
        next(error);
    }
    
    )
};

const formatDrinks = (drinks) => {

    let newData = [];
    if(drinks === null | drinks === undefined)
        return [];

        for(drink of drinks){
    
            if(newData.findIndex(x => x["id"] == drink["idDrink"]) !== -1)
                continue;

            let ingredients = [];
            let measures = [];
    
            for(let i = 1; i < 16; i++){
                
                let current = drink["strIngredient" + i];
                if(current !== null && current !== undefined && current !== ""){
                    ingredients.push(current);
                    let measure = drink["strMeasure" + i];
                    if(measure !== null && measure !== undefined)
                        measures.push(measure);
                    else 
                        measures.push("");
                }
            }
    
    
            let newDrink = {
                "id" : drink["idDrink"],
                "name" : drink["strDrink"],
                "category" : drink["strCategory"],
                "alcoholic" : drink["strAlcoholic"] == 'Alcoholic' ? true : false,
                "glass" : drink["strGlass"],
                "instructions" : drink["strInstructions"],
                "image": drink["strDrinkThumb"],
                "ingredients" : ingredients,
                "measures" : measures
    
            }

        newData.push(newDrink);
    }

    return newData;
}

const formatIngredient = (ingredients) => {
    return ingredients[0]["strDescription"];
}


 module.exports={
    searchCocktails,
    searchIngredientByName,
    fullCocktailDetailsById,
    filterByAlcoholic,
    filterByCategory,
    filterByGlass,
    randomCocktail
};