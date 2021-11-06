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
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2
    // Création d'une nouvelle instance : une nouvelle recette
    const recipe1 = new Recipe(
      {
        title: 'Tiramisu',
        level: 'Easy Peasy',
        ingredients: [ "Oeufs", "Sucre", "Mascarpone", "Cacao en poudre", "Boudoirs", "Mama's secret ingredient" ],
        cuisine: 'Italienne',
        dishType: 'dessert',
        image: "/public/images/Tiramisu-photo.png",
        duration: 260,
        creator: 'Emma',
        created: '2021-11-06' 
      })
    recipe1.save()
      .then(function () {
        console.log(`Nouvelle recette : ${recipe1.title} crée !`)
      })
      .catch(error => console.log(`Error in the creation of ${recipe1.title}`, error))
    })
  .then(() => {
    // Iteration 3
    // Importation d'un tableau de recettes via data.json aves Model.insertMany
  Recipe.create(data)
    .then(function () {
      console.log(`Nouvelles recettes importées : ${data.map(function (el) {return el.title})}`)
    })
    .catch(error => console.log('Error in importation of recipes', error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
