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
  .then(() => {
  //Iteration 4
  // Mise à jour d'une recette
    Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then(function () {
        console.log('La recette a été correctement modifiée')
      })
      .catch(error => console.log('Erreur dans la modification de la recette', error))
  })
  .then(() => {
// Iteration 5
// Suppression de la recette du Carrot Cake
    Recipe.deleteOne({title: 'Carrot Cake'})
      .then(function () {
         console.log('La recette a été correctement supprimée')
      })
      .catch(error => console.log('Erreur dans la suppression de la recette', error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Iteration 6
// Fermeture de la database
process.on('SIGINT', () => {
  mongoose.connection.close( () => {
   console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});