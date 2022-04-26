import Express from "express";
import { isAuth } from "../../middleware/jwt.js";
import {
    getIngredientById,
    createNewIngredient,
    editIngredient,
    removeIngredient,
} from "../controller/ingredients.controller.js";

const router = Express.Router();

router.get("/:id", getIngredientById);
router.post("/:id", [isAuth], createNewIngredient);
router.put("/:id", [isAuth], editIngredient);
router.delete("/:id", [isAuth], removeIngredient);

export { router as ingredientRouter };
