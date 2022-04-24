import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeCategorySchema = new Schema({
    title: { type: String, required: true },
    recipes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Recipe",
        },
    ],
});

const RecipeCategory = mongoose.model("RecipeCategory", recipeCategorySchema);

export { RecipeCategory };
