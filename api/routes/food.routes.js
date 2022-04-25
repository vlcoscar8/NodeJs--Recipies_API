import Express from "express";
import { upload, uploadToCloudinary } from "../../middleware/uploadCloud.js";
import {
    getFoodList,
    getFoodDetail,
    postNewFood,
    editFood,
    patchFood,
    deleteFood,
} from "../controller/foodController.js";

const router = Express.Router();

router.get("/", getFoodList);
router.get("/:id", getFoodDetail);
router.post("/", [upload.single("img"), uploadToCloudinary], postNewFood);
router.put("/:id", [upload.single("img"), uploadToCloudinary], editFood);
router.patch("/", [upload.single("img"), uploadToCloudinary], patchFood);
router.delete("/:id", deleteFood);

export { router as foodRouter };
