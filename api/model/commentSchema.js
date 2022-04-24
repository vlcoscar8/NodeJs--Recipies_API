import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { type: String, required: true },
    time: { type: String },
    owner: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
