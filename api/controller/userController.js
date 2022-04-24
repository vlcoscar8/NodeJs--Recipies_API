import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
            img: "https://res.cloudinary.com/oscar-perez-romero/image/upload/v1650820243/userImage_an9td7.png",
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

        // TOKEN JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                rol: "user",
            },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
        );

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

        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

const pushUserIntoRecipe = async (req, res, next) => {
    try {
        const { userId, recipeId } = req.body;

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

const editUser = async (req, res, next) => {
    try {
        const userBody = req.body;
        const imageProfile = req.file_url;
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, {
            img: imageProfile,
            ...userBody,
        });

        const updatedUser = await User.findById(id);

        res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
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

export {
    getUserList,
    getUserDetail,
    registerUser,
    logInUser,
    logOutUser,
    pushUserIntoRecipe,
    editUser,
    removeUserFromRecipe,
};
