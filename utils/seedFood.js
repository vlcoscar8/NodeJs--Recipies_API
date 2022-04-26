import mongoose from "mongoose";
import dotenv from "dotenv";
import { Food } from "../api/model/foodSchema.js";
dotenv.config();
const DB_URL = process.env.DB_URL;

const foodSeed = [
    {
        name: "Italian Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/italianFood_lkz9uo.jpg",
        recipes: [],
    },
    {
        name: "Japanese Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/japaneseFood_cfd61m.jpg",
        recipes: [],
    },
    {
        name: "Mexican Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/mexicanFood_uzfuzz.jpg",
        recipes: [],
    },
    {
        name: "Spanish Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/spanishFood_ft3fys.jpg",
        recipes: [],
    },
    {
        name: "Indian Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/indianFood_hotdnf.jpg",
        recipes: [],
    },
    {
        name: "Chinese Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/chineseFood_ueg7hc.jpg",
        recipes: [],
    },
    {
        name: "French Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/frenchFood_g8ezjk.jpg",
        recipes: [],
    },
    {
        name: "American Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728472/RecipeAssets/FoodCategory/AmericanFood_rqe4mm.jpg",
        recipes: [],
    },
    {
        name: "Vegan Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/VeganFood_vpt78b.jpg",
        recipes: [],
    },
    {
        name: "Nordic Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728475/RecipeAssets/FoodCategory/nordicFood_crwegt.jpg",
        recipes: [],
    },
];

const foodDocument = foodSeed.map((food) => new Food(food));

const creationSeed = mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        await Food.collection.drop();
        await Food.insertMany(foodDocument);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        mongoose.disconnect();
    });
