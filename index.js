import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { connectionDB } from "./config/db.js";
import { DB_URL } from "./config/db.js";
import { foodRouter } from "./api/routes/food.routes.js";
import { recipeRouter } from "./api/routes/recipes.routes.js";
import { ingredientRouter } from "./api/routes/ingredients.routes.js";
import { stepRouter } from "./api/routes/steps.routes.js";
import { userRouter } from "./api/routes/user.routes.js";
import { commentsRouter } from "./api/routes/comments.routes.js";

dotenv.config();

const PORT = process.env.PORT;
const HEROKU = process.env.HEROKU;
const server = express();
const router = express.Router();

// JWT
server.set("secretKey", "nodeRestApi");

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
    cors({
        origin: `*`,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
server.options("/user/:id", cors());
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

//Swagger
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Recipes API - NodeJS, Express & Mongo",
            version: "1.0.0",
        },
        servers: [
            {
                url: `https://apirecetasoscar.herokuapp.com/api-doc/`, // The URL of the api
            },
        ],
    },
    apis: [`./api/documentation/*.js`], // The file where the documentation is written
};

//Router
server.all("/", (req, res) => {
    res.send(`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
        <h1>Recipe social media api done by Oscar Perez</h1>
        <img src="https://www.clara.es/medio/2021/02/11/100-recetas-saludables-con-5-ingredientes-pescado_1eb7cc7f_800x700.jpg" style="width: 250px"/>
        <h2>Documentation:</h2>
        <a href="https://apirecetasoscar.herokuapp.com/api-doc/" target="_blank">Recipe social media api documentation</a>
        <h3>Git hub repository</h3>
        <a href="https://github.com/vlcoscar8/Recipies_API" target="_blank">Recipe social media api code</a>
    </div>
    `);
});
server.use("/", router);
server.use("/food", foodRouter);
server.use("/recipes", recipeRouter);
server.use("/ingredient", ingredientRouter);
server.use("/step", stepRouter);
server.use("/user", userRouter);
server.use("/comments", commentsRouter);
server.use(
    "/api-doc",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);

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
