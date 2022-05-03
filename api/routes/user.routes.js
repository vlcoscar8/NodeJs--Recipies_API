import express from "express";
import { isAuth } from "../../middleware/jwt.js";
import { adminAuth } from "../../middleware/authToken.js";
import { upload, uploadToCloudinary } from "../../middleware/uploadCloud.js";
import {
    getUserList,
    getUserDetail,
    registerUser,
    logInUser,
    logOutUser,
    pushUserIntoRecipe,
    pushRecipeIntoUser,
    editUser,
    editUserRol,
    removeUserFromRecipe,
    removeRecipeFromUser,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getUserList);
router.get("/:id", getUserDetail);
router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);
router.post("/recipe", [isAuth], pushUserIntoRecipe);
router.post("/recipe/owner", [isAuth], pushRecipeIntoUser);
router.post(
    "/:id",
    [upload.single("img"), uploadToCloudinary, isAuth],
    editUser
);
router.patch("/admin/:id", [adminAuth], editUserRol);
router.delete("/recipe", [isAuth], removeUserFromRecipe);
router.delete("/recipe/owner", [isAuth], removeRecipeFromUser);

export { router as userRouter };
