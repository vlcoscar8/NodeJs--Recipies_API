import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/userSchema.js";
import { Recipe } from "../model/recipeSchema.js";

const registerUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        const previousUser = await User.findOne({ email: email });

        if (previousUser) {
            const error = new Error("The user is already registered!");
            return next(error);
        }

        const nameUser = await User.findOne({ username: username });

        if (nameUser) {
            const error = new Error(
                "The username is already taken, please try again!"
            );
            return next(error);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: passwordHash,
            username: username,
            admin: false,
            img: "https://res.cloudinary.com/oscar-perez/image/upload/v1651068282/RecipeAssets/FoodCategory/userImage_hsw5hj.png",
        });

        await newUser.save();

        return res.status(201).json({
            status: 201,
            message: "User registered successfully!",
            data: {
                id: newUser._id,
            },
        });
    } catch (error) {
        return next(error);
    }
};

const logInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        const isValidPassword = await bcrypt.compare(
            password,
            user?.password ?? ""
        );

        if (!user || !isValidPassword) {
            const error = {
                status: 401,
                message: "The email & password combination is incorrect!",
            };
            return next(error);
        }

        // VERIFY IF THE USER IS ADMIN OR NOT
        let token;

        if (user.admin) {
            // ADMIN TOKEN JWT
            token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    admin: true,
                },
                req.app.get("secretKey"),
                { expiresIn: "1h" }
            );
        } else {
            // REGULAR TOKEN JWT
            token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    admin: false,
                },
                req.app.get("secretKey"),
                { expiresIn: "1h" }
            );
        }

        // Response
        return res.json({
            status: 200,
            message: "Loggin success!",
            data: {
                userId: user._id,
                token: token,
            },
        });
    } catch (error) {
        return next(error);
    }
};

const logOutUser = async (req, res, next) => {
    try {
        req.authority = null;
        return res.json({
            status: 200,
            message: "Logout!",
            token: null,
        });
    } catch (error) {
        next(error);
    }
};

const getUserList = async (req, res, next) => {
    try {
        const usersList = await User.find();

        res.status(200).json(usersList);
    } catch (error) {
        return next(error);
    }
};

const getUserDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { value } = req.query;

        const user = await User.findById(id).populate(value ? `${value}` : "");

        const userObj = Object.values(user)[2];
        const cleanObj = Object.entries(userObj);

        cleanObj.forEach((el) =>
            el[0] === `${value}`
                ? res.status(200).json({
                      status: 200,
                      message:
                          el[1].length < 1
                              ? `${value} list is empty`
                              : `${value} value is successfully filtered`,
                      data: el[1],
                  })
                : ""
        );

        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

const pushUserIntoRecipe = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.body;

        const recipe = await Recipe.findById(recipeId);

        if (recipe.owner.length > 0) {
            return res.status(400).json("The recipe has already an owner");
        }

        await Recipe.findByIdAndUpdate(recipeId, {
            $push: {
                owner: userId,
            },
        });

        const updatedRecipe = await Recipe.findById(recipeId);

        res.status(200).json(updatedRecipe);
    } catch (error) {
        return next(error);
    }
};

const pushRecipeIntoUser = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.body;

        const recipe = await Recipe.findById(recipeId);
        const owner = await User.findById(userId);
        console.log(owner.recipes);

        const userRecipe = owner.recipes.filter(
            (rec) => rec.title === recipe.title
        );

        if (userRecipe.length > 0) {
            return res.status(400).json("The user has already the same recipe");
        }

        await User.findByIdAndUpdate(userId, {
            $push: {
                recipes: recipeId,
            },
        });

        const updatedUser = await User.findById(userId).populate("recipes");

        res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
};

const editUser = async (req, res, next) => {
    try {
        const userBody = req.body;
        const imageProfile = req.file_url;
        const { id } = req.params;

        await User.findByIdAndUpdate(id, {
            img: imageProfile,
            ...userBody,
        });

        const updatedUser = await User.findById(id);

        res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
};

const editUserRol = async (req, res, next) => {
    try {
        const { admin } = req.body;
        const { id } = req.params;

        await User.findByIdAndUpdate(id, {
            admin: admin,
        });

        const updatedUser = await User.findById(id);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const removeUserFromRecipe = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.body;

        await Recipe.findByIdAndUpdate(recipeId, {
            $pull: {
                owner: userId,
            },
        });

        const updatedRecipe = await Recipe.findById(recipeId);

        res.status(200).json(updatedRecipe);
    } catch (error) {
        return next(error);
    }
};

const removeRecipeFromUser = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.body;

        await User.findByIdAndUpdate(userId, {
            $pull: {
                recipes: recipeId,
            },
        });

        const updatedUser = await User.findById(userId);

        res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
};

export {
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
};
