import Express from "express";
import { isAuth } from "../../middleware/authJWT.js";
import {
    createNewStep,
    editStep,
    removeStep,
    removeStepFromRecipe,
} from "../controller/stepController.js";

const router = Express.Router();

router.post("/:id", [isAuth], createNewStep);
router.put("/:id", [isAuth], editStep);
router.delete("/:id", [isAuth], removeStep);
router.delete("/", [isAuth], removeStepFromRecipe);

export { router as stepRouter };
