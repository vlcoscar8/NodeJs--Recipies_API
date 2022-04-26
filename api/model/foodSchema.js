import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
});

const Food = mongoose.model("Food", foodSchema);

export { Food };
