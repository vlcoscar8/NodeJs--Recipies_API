import { Step } from "../model/stepSchema.js";
import { Recipe } from "../model/recipeSchema.js";

const createNewStep = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bodyStep = req.body;

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
        const deletedStep = await Step.findByIdAndDelete(id);

        res.status(200).json({
            deleted: deletedStep,
        });
    } catch (error) {
        return next(error);
    }
};

const removeStepFromRecipe = async (req, res, next) => {
    try {
        const { stepId, recipeId } = req.body;

        await Recipe.findByIdAndUpdate(recipeId, {
            $pull: {
                steps: stepId,
            },
        });

        const editedRecipe = await Recipe.findById(recipeId).populate("steps");

        res.status(200).json(editedRecipe);
    } catch (error) {
        return next(error);
    }
};

export { createNewStep, editStep, removeStep, removeStepFromRecipe };
