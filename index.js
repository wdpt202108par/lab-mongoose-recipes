const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');


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


        // ITERATION 2 : creer une première recette lambda
        Recipe.create({ title: "tarte aux pommes", ingredients: ["topping iteration 2", "pomme"] })

        // 2nd promesse liée à l'insertion de la première recette
        .then(recipe => { console.log("SUCCESS : insertion réussie de la première recette", recipe) })
            .catch(error => console.log("ERROR :  insertion de la première recette", recipe))


        // ITERATION 3 : ajoute l'intégralité des recettes dans la db depuis le fichier importé data.json

        // Import of the data from './data.json'
        const data = require('./data');
        Recipe.insertMany(data)
            .then(recipe => console.log("SUCCESS : insertions réussies de toutes les recettes du fichier importé data", 'title', recipe))
            .catch(error => console.log("ERROR : insertion des recettes depuis data"))

        // ITERATION 4 : ajoute l'intégralité des recettes dans la db depuis le fichier importé data.json
        // avec var mais ne fonctionne pas (const recipeToUpdate= "Rigatoni alla Genovese")
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
            .then(function(majRecipe) {
                console.log("SUCCESS : mise à jour réussie de la recette", majRecipe)
            })
            .catch(error => console.log("ERROR : maj erreur recette", majRecipe))

        // ITERATION 5 : suppression du carrot caaake
        Recipe.deleteOne({ title: 'Carrot Cake' })
            .then(function(deleteRecipe) {
                console.log("SUCCESS : suppression réussie de la recette", deleteRecipe)
            })
            .catch(error => console.log("ERROR : suppression recette", deleteRecipe))
            // DB promesse si connexion db all bad
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    })

/* ITERATION 6 : couper connexion mongoose après execution de toutes les opérations
BRAINSTORMING : gérer le timing d'éxecution des opérations avec PROMISES ALL ?
+     mongoose.connection.close();
*/