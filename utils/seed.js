import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_URL } from "../config/db.js";
import { Food } from "../api/model/foodSchema.js";

dotenv.config();

const foodSeed = [
    {
        name: "Italian Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/italianFood_lkz9uo.jpg",
        categories: [],
    },
    {
        name: "Japanese Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/japaneseFood_cfd61m.jpg",
        categories: [],
    },
    {
        name: "Mexican Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/mexicanFood_uzfuzz.jpg",
        categories: [],
    },
    {
        name: "Spanish Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/spanishFood_ft3fys.jpg",
        categories: [],
    },
    {
        name: "Indian Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/indianFood_hotdnf.jpg",
        categories: [],
    },
    {
        name: "Chinese Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/chineseFood_ueg7hc.jpg",
        categories: [],
    },
    {
        name: "French Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728473/RecipeAssets/FoodCategory/frenchFood_g8ezjk.jpg",
        categories: [],
    },
    {
        name: "American Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728472/RecipeAssets/FoodCategory/AmericanFood_rqe4mm.jpg",
        categories: [],
    },
    {
        name: "Vegan Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728474/RecipeAssets/FoodCategory/VeganFood_vpt78b.jpg",
        categories: [],
    },
    {
        name: "Nordic Food",
        img: "https://res.cloudinary.com/oscar-perez/image/upload/v1650728475/RecipeAssets/FoodCategory/nordicFood_crwegt.jpg",
        categories: [],
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
