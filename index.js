const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


//const recipeTitle = new Schema ({title: 'Our recipe'});
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,                                                                                       
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    const createRecipe = async () => {
      try {
        const newRecipe = await Recipe.create({
          title: "Asian Glazed Chicken Thighs",
          level: "Amateur Chef",
          ingredients: [
            "1/2 cup rice vinegar",
            "5 tablespoons honey",
            "1/3 cup soy sauce (such as Silver Swan®)",
            "1/4 cup Asian (toasted) sesame oil",
            "3 tablespoons Asian chili garlic sauce",
            "3 tablespoons minced garlic",
            "salt to taste",
            "8 skinless, boneless chicken thighs",
          ],
          cuisine: "Asian",
          dishType: "main_course",
          image:
            "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
          duration: 40,
          creator: "Chef LePapu",
        });
        console.log(newRecipe.title);
      } catch (err) {
        console.log("err", err);
      }
    };
  // create recipe
  const createManyRecipes = async () => {
    try {
      const newRecipes = await Recipe.insertMany(data);
      // console.log(newRecipes)
    } catch (err) {
      console.log("err", err);
    }
  };

  return createManyRecipes();
})
.then(() => {
  const updateDuration = async (name, newDuration) => {
    try {
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: name },
        { duration: newDuration },
        { new: true }
      );
      console.log(updatedRecipe);
    } catch (err) {
      console.log("err", err);
    }
  };

  return updateDuration("Rigatoni alla Genovese", 100);
})



  /*
// tryouts for the 2eme then, but not wokrimng
  // deuxieme then 
  .then(() => {
    //Need to write the Recipe.create(); to access the base de donnees
    Recipe.create({title:'Pattes', level:'Amateur', ingredients:['blé', 'sel'], cusine:'',dishType:'', image:'',duration:'',created:''})
    .then( () => {
      console.log(`the title of the recipe is: ${Recipe.title}`);
      // on insert une recipt dans la bdd
      // console.log ...
    }).catch((error) => {
      console.log(`Error lors de l'insertion de recipe`, error)
    })
*/
   // console.log(`The title of the recipe is :${}`);
    // Run your code here, after you have insured that the connection was made

  

   // console.log(`The title of the recipe is :${}`);
    // Run your code here, after you have insured that the connection was made
