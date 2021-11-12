const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the 
  title: {
    type:String
  },
  level:{
    type:String
  },
  ingredients:{
    type:[String]
  },
  cusine: {
    type:String
  },
  dishType:{
  type:String
  },

  image:{
    type:String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration:{
    type:Number
  },
  creator:{
    type:String
  },
  created:{
    type:Date,
    default:Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
