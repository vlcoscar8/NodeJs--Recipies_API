import { Step } from "../model/stepSchema.js";
import { Recipe } from "../model/recipeSchema.js";

const createNewStep = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bodyStep = req.body;

        // CHECK IF THE STEP ORDER IS ALREADY USED
        const recipe = await Recipe.findById(id).populate("steps");
        const step = recipe.steps.filter((stp) => {
            return stp.order === bodyStep.order;
        });
        if (step.length > 0) {
            return res
                .status(400)
                .json("The step order is already included in the recipe");
        }

        // NEXT
        const newStep = new Step(bodyStep);
        newStep.save();

        await Recipe.findByIdAndUpdate(id, {
            $push: {
                steps: newStep._id,
            },
        });

        const updatedRecipe = await Recipe.findById(id).populate("steps");

        res.status(200).json(updatedRecipe);
    } catch (error) {
        return next(error);
    }
};

const editStep = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBody = req.body;

        const newStep = new Step({
            _id: id,
            ...newBody,
        });
        await Step.findByIdAndUpdate(id, newStep);

        const editedStep = await Step.findById(id);

        res.status(200).json(editedStep);
    } catch (error) {
        return next(error);
    }
};

const removeStep = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findOne({ steps: id });

        await Recipe.findOneAndUpdate(
            { steps: id },
            {
                $pull: {
                    steps: id,
                },
            }
        );

        const deletedStep = await Step.findByIdAndDelete(id);
        const updatedRecipe = await Recipe.findOne({ title: recipe.title });

        res.status(200).json({
            status: 200,
            message: "OK",
            updated: updatedRecipe,
            deleted: deletedStep,
        });
    } catch (error) {
        return next(error);
    }
};

export { createNewStep, editStep, removeStep };
