const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// const cakeRecipe = {title:'Cake', level:'Easy Peasy', ingredients:['flour', 'eggs', 'sugar'], cuisine:'french', dishType:'dessert',duration:15, creator:'Cindy'}
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
    // Recipe.create(cakeRecipe)
    //   .then(console.log(cakeRecipe.title))
    //   .catch(err => console.log('oops', err));
    Recipe.insertMany(data)
      .then(data.map(el=>console.log(el.title)))
      .catch(err => console.log('oops', err));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
