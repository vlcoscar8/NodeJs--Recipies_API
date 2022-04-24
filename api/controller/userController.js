import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userSchema.js";

const registerUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        const previousUser = await User.findOne({ email: email });

        if (previousUser) {
            const error = new Error("The user is already registered!");
            return next(error);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: passwordHash,
            username: username,
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

export { registerUser, logInUser, logOutUser };
