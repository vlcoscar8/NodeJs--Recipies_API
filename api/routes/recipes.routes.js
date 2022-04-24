import Express from "express";
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
router.post("/", [upload.single("img"), uploadToCloudinary], postNewRecipe);
router.put("/:id", [upload.single("img")], editRecipe);
router.delete("/:id", removeRecipe);

export { router as recipeRouter };
