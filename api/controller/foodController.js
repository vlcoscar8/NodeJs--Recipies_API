import { Food } from "../model/foodSchema.js";

const getFoodList = async (req, res, next) => {
    try {
        const { start, limit } = req.query;

        const mainFoodList = await Food.find();

        if (start && limit) {
            const filteredFoodList = mainFoodList.filter(
                (food) =>
                    mainFoodList.indexOf(food) >= start &&
                    mainFoodList.indexOf(food) < limit
            );
            return res.status(200).json(filteredFoodList);
        }

        return res.status(200).json(mainFoodList);
    } catch (error) {
        return next(error);
    }
};

const getFoodDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const detailFood = await Food.findById(id).populate("categories");

        return res.status(200).json(detailFood);
    } catch (error) {
        return next(error);
    }
};

const postNewFood = async (req, res, next) => {
    try {
        const body = req.body;

        const newFood = new Food(body);

        await newFood.save();

        res.status(201).json(newFood);
    } catch (error) {
        return next(error);
    }
};

const editFood = async (req, res, next) => {
    try {
        const newBody = req.body;
        const { id } = req.params;

        const newFood = new Food({
            _id: id,
            ...newBody,
        });

        await Food.findByIdAndUpdate(id, newFood);

        return res.status(200).json(newFood);
    } catch (error) {
        return next(error);
    }
};

const patchFood = async (req, res, next) => {
    try {
        const { id, name, img } = req.body;

        const obj = {
            ...(name && { name: name }),
            ...(img && { img: img }),
        };

        await Food.findByIdAndUpdate({ _id: id }, obj);
        const updatedFood = await Food.findById(id);

        res.status(200).json(updatedFood);
    } catch (error) {
        return next(error);
    }
};

const deleteFood = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Food.findByIdAndDelete(id);
        const deletedFood = await Food.findById(id);

        res.status(200).json({
            deleted: deletedFood ?? true,
        });
    } catch (error) {
        next(error);
    }
};

export {
    getFoodList,
    getFoodDetail,
    postNewFood,
    editFood,
    patchFood,
    deleteFood,
};
