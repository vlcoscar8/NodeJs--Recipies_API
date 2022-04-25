import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, default: "regular", enum: ["regular", "admin"] },
    img: { type: String },
    name: { type: String },
    surname: { type: String },
    age: { type: Number },
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.email;
    },
});

const User = mongoose.model("User", userSchema);

export { User };
