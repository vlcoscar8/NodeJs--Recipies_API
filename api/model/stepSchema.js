import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stepSchema = new Schema({
    order: { type: Number, required: true },
    description: { type: String, required: true },
});

const Step = mongoose.model("Step", stepSchema);

export { Step };
