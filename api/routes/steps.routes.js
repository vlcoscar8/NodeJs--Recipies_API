import Express from "express";
import {
    createNewStep,
    editStep,
    removeStep,
    removeStepFromRecipe,
} from "../controller/stepController.js";

const router = Express.Router();

router.post("/:id", createNewStep);
router.put("/:id", editStep);
router.delete("/:id", removeStep);
router.delete("/", removeStepFromRecipe);

export { router as stepRouter };
