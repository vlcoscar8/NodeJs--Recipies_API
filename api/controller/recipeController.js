import { Recipe } from "../model/recipeSchema.js";
import { Food } from "../model/foodSchema.js";

const getRecipesList = async (req, res, next) => {
    try {
        const { food, category, difficulty, timeLimit } = req.query;

        const filterObj = {
            ...(food && { food: food }),
            ...(category && { category: category }),
            ...(difficulty && { difficulty: difficulty }),
            ...(timeLimit && { time: { $lte: timeLimit } }),
        };
        const recipesList = await Recipe.find(filterObj);

        res.status(200).json(recipesList);
    } catch (error) {
        next(error);
    }
};

const getRecipeDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findById(id)
            .populate("ingredients")
            .populate("steps")
            .populate("comments");

        res.status(200).json(recipe);
    } catch (error) {
        return next(error);
    }
};

const postNewRecipe = async (req, res, next) => {
    try {
        const body = req.body;

        const recipeSameTitle = await Recipe.find({ title: body.title });

        if (recipeSameTitle) {
            res.status(400).json(
                "The title of the recipe already exist, please try with another title"
            );
        }

        const imageUpdated = req.file_url;

        const newRecipe = new Recipe({
            img: imageUpdated,
            ...body,
        });
        await newRecipe.save();

        res.status(200).json(newRecipe);
    } catch (error) {
        return next(error);
    }
};

const editRecipe = async (req, res, next) => {
    try {
        const newBody = req.body;
        const { id } = req.params;
        const imageUpdated = req.file_url;

        const obj = {
            ...(imageUpdated && imageUpdated),
            ...(newBody && newBody),
        };

        await Recipe.findByIdAndUpdate(id, {
            ...obj,
        });

        const editedRecipe = await Recipe.findById(id);

        res.status(200).json(editedRecipe);
    } catch (error) {
        return next(error);
    }
};

const pushRecipeIntoFood = async (req, res, next) => {
    try {
        const { recipeId, foodId } = req.body;
        await Food.findByIdAndUpdate(foodId, {
            $push: { recipes: recipeId },
        });

        const updatedFood = await Food.findById(foodId);

        res.status(200).json(updatedFood);
    } catch (error) {
        return next(error);
    }
};

const removeRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findById(id);
        const food = await Food.findOne({ recipes: recipe });

        if (!food) {
            const deletedRecipe = await Recipe.findByIdAndDelete(id);
            return res.status(200).json(deletedRecipe);
        }

        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        const updatedFood = await Food.findOne({ name: food.name });

        res.status(200).json({
            status: 200,
            updated: updatedFood,
            deleted: deletedRecipe,
        });
    } catch (error) {
        return next(error);
    }
};

export {
    getRecipesList,
    getRecipeDetail,
    postNewRecipe,
    pushRecipeIntoFood,
    editRecipe,
    removeRecipe,
};
