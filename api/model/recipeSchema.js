import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    time: { type: Number, required: true },
    people: { type: Number, required: true },
    ingredients: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Ingredient",
        },
    ],
    steps: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Step",
        },
    ],
    owner: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        },
    ],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export { Recipe };
