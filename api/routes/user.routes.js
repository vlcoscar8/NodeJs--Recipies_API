import Express from "express";
import { isAuth } from "../../middleware/authJWT.js";
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
router.post("/recipe", [isAuth], pushUserIntoRecipe);
router.patch(
    "/:id",
    [upload.single("img"), uploadToCloudinary, isAuth],
    editUser
);
router.delete("/recipe", [isAuth], removeUserFromRecipe);

export { router as userRouter };
