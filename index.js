const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const cakeRecipe = {title:'Cake', level:'Easy Peasy', ingredients:['flour', 'eggs', 'sugar'], cuisine:'french', dishType:'dessert',duration:15, creator:'Cindy'}

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
    Recipe.create(cakeRecipe)
      .then(console.log(cakeRecipe.title))
      .catch(err => console.log('oops', err));
    Recipe.insertMany(data)
      .then(data.map(el=>console.log(el.title)))
      .catch(err => console.log('oops', err));
  })
  .then(() => {
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then(console.log('Modification done'))
      .catch(err => console.log('Update could not be done', err))
  })
  .then(() => {
    Recipe.deleteOne({title: "Carrot Cake"})
      .then(console.log("Carrot Cake was successfully deleted"))
      .catch(err => console.log("Could not delete Carrot Cake", err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose
    .connection.close()
    .then(() => {
      console.log('Mongoose default connection disconnected through app termination')
    })
    .catch((err) => {
      console.log("Failed to close the database", err)
    })
