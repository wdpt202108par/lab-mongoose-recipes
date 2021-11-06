const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
    /*return Recipe.deleteMany()*/
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//Iteration 2 - Create random documents
  /*Recipe.create({
  title: 'test'
  } 
)
  .then(function (myNewRecipe) {
    console.log('new recipe created', myNewRecipe)
  })
  .catch(err => console.log(err))*/

//Iteration 3 - Create documents from data.json
/*Recipe.insertMany(data)
.then(function (myNewRecipe) {
    console.log('new recipe created', myNewRecipe)
  })
  .catch(err => console.log(err))*/

//Iteration 4 - Update 'Rigatoni alla Genovese' document
/*Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100})
  .then(function(updateRecipe){
    console.log('recipe updated!',updateRecipe)
  })
  .catch(err => console.log(err))*/

//Iteration 5 - Delete 'Carrot Cake' document
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(function(deleteRecipe){
  console.log('recipe deleted!', deleteRecipe)
})
.catch(err => console.log(err))