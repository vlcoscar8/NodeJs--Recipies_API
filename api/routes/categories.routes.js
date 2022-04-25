import Express from "express";
import { isAuth } from "../../middleware/jwt.js";
import { adminAuth } from "../../middleware/authToken.js";
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
router.post("/", [adminAuth], postNewCategoryRecipe);
router.patch("/", [isAuth], pushRecipeIntoCategoryRecipe);
router.patch("/food", [adminAuth], pushCategoryRecipeIntoFood);
router.delete("/:id", [adminAuth], removeCategoryRecipe);
router.delete("/", [isAuth], removeRecipeFromCategory);

export { router as categoriesRouter };
