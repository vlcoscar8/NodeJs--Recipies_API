import Express from "express";
import { isAuth } from "../../middleware/jwt.js";
import {
    createNewStep,
    editStep,
    removeStep,
} from "../controller/stepController.js";

const router = Express.Router();

router.post("/:id", [isAuth], createNewStep);
router.put("/:id", [isAuth], editStep);
router.delete("/:id", [isAuth], removeStep);

export { router as stepRouter };
