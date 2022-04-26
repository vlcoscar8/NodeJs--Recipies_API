import { Ingredient } from "../model/ingredientsSchema.js";
import { Recipe } from "../model/recipeSchema.js";

const getIngredientById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const ingredient = await Ingredient.findById(id);

        res.status(200).json(ingredient);
    } catch (error) {
        return next(error);
    }
};

const createNewIngredient = async (req, res, next) => {
    try {
        const bodyIngredient = req.body;
        const { id } = req.params;

        const recipe = await Recipe.findById(id).populate("ingredients");
        const ingredient = recipe.ingredients.filter((ing) => {
            console.log(ing.name === bodyIngredient.name);
            return ing.name === bodyIngredient.name;
        });

        if (ingredient) {
            return res
                .status(400)
                .json("The ingredient is already included in the recipe");
        }

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
    getIngredientById,
    createNewIngredient,
    editIngredient,
    removeIngredient,
    removeIngredientFromRecipe,
};
