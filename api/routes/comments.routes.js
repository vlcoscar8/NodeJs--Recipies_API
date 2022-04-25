import Express from "express";
import { isAuth } from "../../middleware/jwt.js";
import {
    createComment,
    pushUserIntoComment,
    removeComment,
    removeCommentfromRecipe,
} from "../controller/commentController.js";

const router = Express.Router();

router.post("/:id", [isAuth], createComment);
router.patch("/", [isAuth], pushUserIntoComment);
router.delete("/:id", [isAuth], removeComment);
router.delete("/", [isAuth], removeCommentfromRecipe);

export { router as commentsRouter };
