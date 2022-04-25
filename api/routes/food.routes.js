import Express from "express";
import { isAuth } from "../../middleware/authJWT.js";
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
    [upload.single("img"), uploadToCloudinary, isAuth],
    postNewFood
);
router.put(
    "/:id",
    [upload.single("img"), uploadToCloudinary, isAuth],
    editFood
);
router.patch(
    "/",
    [upload.single("img"), uploadToCloudinary, isAuth],
    patchFood
);
router.delete("/:id", [isAuth], deleteFood);
router.delete("/", [isAuth], removeCategoryFromFood);

export { router as foodRouter };
