import Express from "express";
import { isAuth } from "../../middleware/jwt.js";
import { adminAuth } from "../../middleware/authToken.js";
import { upload, uploadToCloudinary } from "../../middleware/uploadCloud.js";
import {
    getFoodList,
    getFoodDetail,
    postNewFood,
    editFood,
    patchFood,
    deleteFood,
    removeCategoryFromFood,
} from "../controller/foodController.js";

const router = Express.Router();

router.get("/", getFoodList);
router.get("/:id", getFoodDetail);
router.post(
    "/",
    [upload.single("img"), uploadToCloudinary, adminAuth],
    postNewFood
);
router.put(
    "/:id",
    [upload.single("img"), uploadToCloudinary, adminAuth],
    editFood
);
router.patch(
    "/",
    [upload.single("img"), uploadToCloudinary, adminAuth],
    patchFood
);
router.delete("/:id", [adminAuth], deleteFood);
router.delete("/", [adminAuth], removeCategoryFromFood);

export { router as foodRouter };
