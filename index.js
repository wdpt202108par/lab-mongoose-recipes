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
  // deuxieme then 
  .then(() => {
    //Need to write the Recipe.create(); to access the base de donnees
    Recipe.create({})
    .then( () => {
      console.log(`the title of the recipe is: ${Recipe.title}`);
      // on insert une recipt dans la bdd
      // console.log ...
    }).catch((error) => {
      console.log(`Error lors de l'insertion de recipe`, error)

    })

   // console.log(`The title of the recipe is :${}`);
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
