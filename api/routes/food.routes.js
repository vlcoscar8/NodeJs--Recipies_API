import Express from "express";
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
router.post("/", postNewFood);
router.put("/:id", editFood);
router.patch("/", patchFood);
router.delete("/:id", deleteFood);

export { router as foodRouter };
