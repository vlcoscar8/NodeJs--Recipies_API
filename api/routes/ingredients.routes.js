import Express from "express";
import {
    createNewIngredient,
    editIngredient,
    removeIngredient,
    removeIngredientFromRecipe,
} from "../controller/ingredients.controller.js";

const router = Express.Router();

router.post("/:id", createNewIngredient);
router.put("/:id", editIngredient);
router.delete("/:id", removeIngredient);
router.delete("/", removeIngredientFromRecipe);

export { router as ingredientRouter };
