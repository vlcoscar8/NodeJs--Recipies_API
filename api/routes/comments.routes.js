import Express from "express";
import {
    createComment,
    pushUserIntoComment,
    removeComment,
    removeCommentfromRecipe,
} from "../controller/commentController.js";

const router = Express.Router();

router.post("/:id", createComment);
router.patch("/", pushUserIntoComment);
router.delete("/:id", removeComment);
router.delete("/", removeCommentfromRecipe);

export { router as commentsRouter };
