import Express from "express";
import { isAuth } from "../../middleware/jwt.js";
import { upload, uploadToCloudinary } from "../../middleware/uploadCloud.js";
import {
    getRecipesList,
    getRecipeDetail,
    postNewRecipe,
    editRecipe,
    removeRecipe,
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
router.delete("/:id", [isAuth], removeRecipe);

export { router as recipeRouter };
