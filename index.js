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
    // insérer notre Recip
    const data = { "title": "tarte aux pommes", ingredients:['pommes', 'pates brisée']}
    Recipe.create(data)
    .then(recipe => console.log('la tarte est prête', recipe))
    .catch(error => console.log("error lors de l'insertion d'un recip"))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
