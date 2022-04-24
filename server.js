import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import { connectionDB } from "./config/db.js";
import { DB_URL } from "./config/db.js";
import { foodRouter } from "./api/routes/food.routes.js";
import { recipeRouter } from "./api/routes/recipes.routes.js";
import { categoriesRouter } from "./api/routes/categories.routes.js";
import { ingredientRouter } from "./api/routes/ingredients.routes.js";
import { stepRouter } from "./api/routes/steps.routes.js";

dotenv.config();

const PORT = process.env.PORT;
const server = express();
const router = express.Router();

// JWT
server.set("secretKey", "nodeRestApi");

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000,
        },
        store: MongoStore.create({
            mongoUrl: DB_URL,
        }),
    })
);

//Router
server.use("/", router);
server.use("/food", foodRouter);
server.use("/recipes", recipeRouter);
server.use("/categories", categoriesRouter);
server.use("/ingredient", ingredientRouter);
server.use("/step", stepRouter);

// Errors
server.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

server.use((error, req, res, next) => {
    return res
        .status(error.status || 500)
        .json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
