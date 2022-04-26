import Express from "express";
import { isAuth } from "../../middleware/jwt.js";
import { upload, uploadToCloudinary } from "../../middleware/uploadCloud.js";
import {
    getRecipesList,
    getRecipeDetail,
    postNewRecipe,
    editRecipe,
    pushRecipeIntoFood,
    removeRecipe,
    removeRecipeFromFood,
} from "../controller/recipeController.js";

const router = Express.Router();

router.get("/", getRecipesList);
router.get("/:id", getRecipeDetail);
router.post(
    "/",
    [upload.single("img"), uploadToCloudinary, isAuth],
    postNewRecipe
);
router.put(
    "/:id",
    [upload.single("img"), uploadToCloudinary, isAuth],
    editRecipe
);
router.patch("/food", [isAuth], pushRecipeIntoFood);
router.delete("/:id", [isAuth], removeRecipe);
router.delete("/", [isAuth], removeRecipeFromFood);

export { router as recipeRouter };
