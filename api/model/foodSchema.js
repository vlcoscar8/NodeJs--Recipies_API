import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    categories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "RecipeCategory",
        },
    ],
});

const Food = mongoose.model("Food", foodSchema);

export { Food };
