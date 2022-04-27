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

        const { value } = req.query;

        const food = await Food.findById(id).populate(value ? `${value}` : "");

        if (!food) {
            return res.status(400).json("The food doesn't exist");
        }

        const foodObj = Object.values(food)[2];
        const cleanObj = Object.entries(foodObj);

        cleanObj.forEach((el) =>
            el[0] === `${value}`
                ? res.status(200).json({
                      status: 200,
                      message:
                          el[1].length < 1
                              ? `${value} value is empty`
                              : `${value} value is successfully filtered`,
                      data: el[1],
                  })
                : ""
        );

        return res.status(200).json(food);
    } catch (error) {
        return next(error);
    }
};

const postNewFood = async (req, res, next) => {
    try {
        const body = req.body;
        const image = req.file_url;

        const newFood = new Food({
            name: body.foodName,
            img: image,
        });

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
        const image = req.file_url;

        const obj = {
            ...(image && image),
            ...(newBody && newBody),
        };

        await Food.findByIdAndUpdate(id, {
            ...obj,
        });

        const foodUpdated = await Food.findById(id);

        return res.status(200).json(foodUpdated);
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

export { getFoodList, getFoodDetail, postNewFood, editFood, deleteFood };
