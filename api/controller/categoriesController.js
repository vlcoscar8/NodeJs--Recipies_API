import { RecipeCategory } from "../model/recipeCategorySchema.js";
import { Food } from "../model/foodSchema.js";

const getRecipeCategoriesList = async (req, res, next) => {
    try {
        const allFoodCategories = await RecipeCategory.find();

        if (allFoodCategories.length === 0) {
            return res.status(200).json({
                status: "200",
                message: "Not categories added yet",
                data: { allFoodCategories },
            });
        }

        res.status(200).json(allFoodCategories);
    } catch (error) {
        return next(error);
    }
};

const getCategoryDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await RecipeCategory.findById(id).populate("recipes");

        res.status(200).json(category);
    } catch (error) {
        return next(error);
    }
};

const postNewCategoryRecipe = async (req, res, next) => {
    try {
        const body = req.body;
        const newCategoryRecipe = new RecipeCategory(body);

        await newCategoryRecipe.save();

        return res.status(200).json(newCategoryRecipe);
    } catch (error) {
        return next(error);
    }
};

const pushRecipeIntoCategoryRecipe = async (req, res, next) => {
    try {
        const { recipeId, categoryId } = req.body;
        await RecipeCategory.findByIdAndUpdate(categoryId, {
            $push: { recipes: recipeId },
        });

        const updatedCategory = await RecipeCategory.findById(categoryId);

        res.status(200).json(updatedCategory);
    } catch (error) {
        return next(error);
    }
};

const pushCategoryRecipeIntoFood = async (req, res, next) => {
    try {
        const { categoryId, foodId } = req.body;
        await Food.findByIdAndUpdate(foodId, {
            $push: { categories: categoryId },
        });

        const updatedFood = await Food.findById(foodId);

        res.status(200).json(updatedFood);
    } catch (error) {
        return next(error);
    }
};

const removeCategoryRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;

        await RecipeCategory.findByIdAndDelete(id);
        const deletedCategory = await RecipeCategory.findById(id);

        res.status(200).json({
            deleted: deletedCategory ?? true,
        });
    } catch (error) {
        return next(error);
    }
};

const removeRecipeFromCategory = async (req, res, next) => {
    try {
        const { recipeId, categoryId } = req.body;
        await RecipeCategory.findByIdAndUpdate(categoryId, {
            $pull: { recipes: recipeId },
        });

        const categoryRecipe = await RecipeCategory.findById(categoryId);

        res.status(200).json(categoryRecipe);
    } catch (error) {
        return next(error);
    }
};

export {
    getRecipeCategoriesList,
    getCategoryDetail,
    postNewCategoryRecipe,
    pushRecipeIntoCategoryRecipe,
    pushCategoryRecipeIntoFood,
    removeCategoryRecipe,
    removeRecipeFromCategory,
};
