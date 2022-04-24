import { Ingredient } from "../model/ingredientsSchema.js";
import { Recipe } from "../model/recipeSchema.js";

const createNewIngredient = async (req, res, next) => {
    try {
        const bodyIngredient = req.body;
        const { id } = req.params;

        const newIngredient = new Ingredient(bodyIngredient);
        await newIngredient.save();

        await Recipe.findByIdAndUpdate(id, {
            $push: {
                ingredients: newIngredient._id,
            },
        });

        const updatedRecipe = await Recipe.findById(id).populate("ingredients");

        res.status(200).json(updatedRecipe);
    } catch (error) {
        return next(error);
    }
};

const editIngredient = async (req, res, next) => {
    try {
        const newBody = req.body;
        const { id } = req.params;

        const newIngredient = new Ingredient({
            _id: id,
            ...newBody,
        });

        await Ingredient.findByIdAndUpdate(id, newIngredient);

        res.status(200).json(newIngredient);
    } catch (error) {
        return next(error);
    }
};

const removeIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;

        const removedIngredient = await Ingredient.findByIdAndDelete(id);

        res.status(200).json({
            deleted: removedIngredient,
        });
    } catch (error) {
        return next(error);
    }
};

const removeIngredientFromRecipe = async (req, res, next) => {
    try {
        const { ingredientId, recipeId } = req.body;

        await Recipe.findByIdAndUpdate(recipeId, {
            $pull: {
                ingredients: ingredientId,
            },
        });

        const updatedRecipe = await Recipe.findById(recipeId);

        res.status(200).json(updatedRecipe);
    } catch (error) {
        return next(error);
    }
};

export {
    createNewIngredient,
    editIngredient,
    removeIngredient,
    removeIngredientFromRecipe,
};
