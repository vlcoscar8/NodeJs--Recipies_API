import Express from "express";
import { upload, uploadToCloudinary } from "../../middleware/uploadCloud.js";
import {
    getUserList,
    getUserDetail,
    registerUser,
    logInUser,
    logOutUser,
    pushUserIntoRecipe,
    editUser,
    removeUserFromRecipe,
} from "../controller/userController.js";

const router = Express.Router();

router.get("/", getUserList);
router.get("/:id", getUserDetail);
router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);
router.post("/recipe", pushUserIntoRecipe);
router.patch("/:id", [upload.single("img"), uploadToCloudinary], editUser);
router.delete("/recipe", removeUserFromRecipe);

export { router as userRouter };
