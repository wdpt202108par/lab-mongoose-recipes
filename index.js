const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
// Declare a new recipe
const cakeRecipe = {title:'Cake', level:'Easy Peasy', ingredients:['flour', 'eggs', 'sugar'], cuisine:'french', dishType:'dessert',duration:15, creator:'Cindy'}

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    // 16:25:05
    console.log(`Connected to the database: '${self.connection.name}'`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Promise.all([
    Recipe.create(cakeRecipe),
    Recipe.insertMany(data)
  ]))
  .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}))
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
  .then(function () {
    console.log('All database manipulations have succeeded');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });