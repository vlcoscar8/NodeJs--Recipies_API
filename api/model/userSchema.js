import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    img: { type: String },
    name: { type: String },
    surname: { type: String },
    age: { type: Number },
});

const User = mongoose.model("User", userSchema);

export { User };
