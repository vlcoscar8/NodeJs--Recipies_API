import Express from "express";
import {
    getRecipeCategoriesList,
    getCategoryDetail,
    postNewCategoryRecipe,
    pushRecipeIntoCategoryRecipe,
    pushCategoryRecipeIntoFood,
    removeCategoryRecipe,
    removeRecipeFromCategory,
    removeCategoryFromFood,
} from "../controller/categoriesController.js";

const router = Express.Router();

router.get("/", getRecipeCategoriesList);
router.get("/:id", getCategoryDetail);
router.post("/", postNewCategoryRecipe);
router.patch("/", pushRecipeIntoCategoryRecipe);
router.patch("/food", pushCategoryRecipeIntoFood);
router.delete("/:id", removeCategoryRecipe);
router.delete("/", removeRecipeFromCategory);
router.delete("/food", removeCategoryFromFood);

export { router as categoriesRouter };
