import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_URL } from "../config/db.js";
import { RecipeCategory } from "../api/model/recipeCategorySchema.js";

dotenv.config();

const categorySeed = [
    {
        title: "Pizza",
        recipes: [],
    },
    {
        title: "Pasta",
        recipes: [],
    },
    {
        title: "Sushi",
        recipes: [],
    },
    {
        title: "Ramen",
        recipes: [],
    },
    {
        title: "Fish",
        recipes: [],
    },
    {
        title: "Tacos",
        recipes: [],
    },
    {
        title: "Burritos",
        recipes: [],
    },
    {
        title: "Rice",
        recipes: [],
    },
    {
        title: "Meat",
        recipes: [],
    },
    {
        title: "Fish",
        recipes: [],
    },
];

const categoryDocument = categorySeed.map(
    (category) => new RecipeCategory(category)
);

const creationSeed = mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        await RecipeCategory.collection.drop();
        await RecipeCategory.insertMany(foodDocument);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        mongoose.disconnect();
    });
