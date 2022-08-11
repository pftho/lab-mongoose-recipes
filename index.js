const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const paellaRecipeObj = {
      title: "Paella",
      level: "Easy Peasy",
      ingredients: ["Rice", "Spices", "Seafood", "Chicken", "Olive Oil"],
      cuisine: "Spanish",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 120,
      creator: "Pauline Thomas",
    };
    return Recipe.create(paellaRecipeObj);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.find();
  })
  .then((allRecipes) => {
    return allRecipes.forEach((recipe) => console.log(recipe.title));
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((updateRecipe) => {
    return console.log(
      `Success! ${updateRecipe.title} recipe cooking time has been updated to ${updateRecipe.duration}`
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    return console.log(`${deletedRecipe} recipe has been deleted`);
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log(`Mongo connection disconnected`);
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
