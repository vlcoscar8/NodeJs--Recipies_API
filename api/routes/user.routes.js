import Express from "express";
import {
    registerUser,
    logInUser,
    logOutUser,
} from "../controller/userController.js";

const router = Express.Router();

// router.get("/", getUserList);
router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);

export { router as userRouter };
