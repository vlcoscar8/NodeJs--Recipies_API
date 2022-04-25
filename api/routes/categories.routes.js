import Express from "express";
import { isAuth } from "../../middleware/authJWT.js";
import {
    getRecipeCategoriesList,
    getCategoryDetail,
    postNewCategoryRecipe,
    pushRecipeIntoCategoryRecipe,
    pushCategoryRecipeIntoFood,
    removeCategoryRecipe,
    removeRecipeFromCategory,
} from "../controller/categoriesController.js";

const router = Express.Router();

router.get("/", getRecipeCategoriesList);
router.get("/:id", getCategoryDetail);
router.post("/", [isAuth], postNewCategoryRecipe);
router.patch("/", [isAuth], pushRecipeIntoCategoryRecipe);
router.patch("/food", [isAuth], pushCategoryRecipeIntoFood);
router.delete("/:id", [isAuth], removeCategoryRecipe);
router.delete("/", [isAuth], removeRecipeFromCategory);

export { router as categoriesRouter };
