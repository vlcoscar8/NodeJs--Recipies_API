import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    admin: { type: Boolean, required: true },
    img: { type: String },
    name: { type: String },
    surname: { type: String },
    age: { type: Number },
    recipes: [{ type: mongoose.Types.ObjectId, ref: "Recipe" }],
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.email;
    },
});

const User = mongoose.model("User", userSchema);

export { User };
