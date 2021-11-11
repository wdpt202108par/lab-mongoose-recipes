const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Iteration 1
const recipeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },

    ingredients: [String],

    cuisine: { type: String },
    dishType: {
        type: String,
        enum: ["Main_course", "Soup", "Snack", "Drink", "Dessert", "Other"],
    },

    image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg',
    },

    duration: { type: Number, min: 0 },

    creator: { type: String },

    created: {
        type: Date,
        default: new Date()
    },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;