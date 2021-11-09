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
   
    //
    // ITERATION 2 CREATION D'UNE RECIPE TARTE AUX POMMES 
    //
    //const data = { "title": "tarte aux pommes", ingredients:['pommes', 'pates brisée']}
    //Recipe.create(data)
    //.then(recipe => console.log('la tarte est prête', recipe))
    //

    //
    //ITERATION 3 INSERTION DES RECETTES data.json
    //

    const data = require('./data');

    Recipe.insertMany(data)
    .then(recipe => console.log('title', recipe))
    .catch(error => console.log("error lors de l'insertion d'un recip"))

    const query = { title: "Rigatoni alla Genovese"},{duration: 220 T};
    Recipe.findOneAndUpdate(query, { duration: '100' }, options, callback)

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
