import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    number: { type: Number, required: true },
    unit: { type: String, required: true },
    name: { type: String, required: true },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export { Ingredient };
