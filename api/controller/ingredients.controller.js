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

        // CHECK IF THE INGREDIENT IS ALREADY CREATED
        const recipe = await Recipe.findById(id).populate("ingredients");
        const ingredient = recipe.ingredients.filter((ing) => {
            return ing.name === bodyIngredient.name;
        });
        if (ingredient.length > 0) {
            return res
                .status(400)
                .json("The ingredient is already included in the recipe");
        }

        // NEXT
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

        const ing = await Ingredient.findById(id);
        const recipe = await Recipe.findOne({ ingredients: ing });

        const deletedIng = await Ingredient.findByIdAndDelete(id);
        const updatedRecipe = await Recipe.findOne({ title: recipe.title });

        res.status(200).json({
            status: 200,
            updated: updatedRecipe,
            deleted: deletedIng,
        });
    } catch (error) {
        return next(error);
    }
};

export {
    getIngredientById,
    createNewIngredient,
    editIngredient,
    removeIngredient,
};
