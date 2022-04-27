import { Recipe } from "../model/recipeSchema.js";
import { Comment } from "../model/commentSchema.js";

const createComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const newComment = new Comment({
            content: content,
            time: new Date(),
        });
        await newComment.save();

        await Recipe.findByIdAndUpdate(id, {
            $push: {
                comments: newComment._id,
            },
        });

        const recipeUpdated = await Recipe.findById(id).populate("comments");

        res.status(200).json(recipeUpdated);
    } catch (error) {
        return next(error);
    }
};

const pushUserIntoComment = async (req, res, next) => {
    try {
        const { userId, commentId } = req.body;

        await Comment.findByIdAndUpdate(commentId, {
            $push: {
                owner: userId,
            },
        });

        const comment = await Comment.findById(commentId);

        res.status(200).json(comment);
    } catch (error) {
        return next(error);
    }
};

const removeComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        const recipe = await Recipe.findOne({ comments: comment });

        await Recipe.findByIdAndUpdate(
            { comments: comment },
            {
                $pull: {
                    coments: id,
                },
            }
        );

        const deletedComment = await Comment.findByIdAndDelete(id);
        const updatedRecipe = await Recipe.findOne({ title: recipe.title });

        res.status(200).json({
            status: 200,
            updated: updatedRecipe,
            deleted: deletedComment,
        });
    } catch (error) {
        return next(error);
    }
};

export { createComment, pushUserIntoComment, removeComment };
