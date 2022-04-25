import Express from "express";
import {
    getIngredientById,
    createNewIngredient,
    editIngredient,
    removeIngredient,
    removeIngredientFromRecipe,
} from "../controller/ingredients.controller.js";

const router = Express.Router();

router.get("/:id", getIngredientById);
router.post("/:id", createNewIngredient);
router.put("/:id", editIngredient);
router.delete("/:id", removeIngredient);
router.delete("/", removeIngredientFromRecipe);

export { router as ingredientRouter };
