import { app } from "../server";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import mongoose from "mongoose";
import { config } from "../config/setup";
import user from "../routes/user";
import auth from "../middleware/auth";

export function serverSetup() {

    // * Middlewares setup
    middlewareSetup();

    // * Routes setup
    routesSetup();

    // * Database and start server
    databaseSetup();

}

export function databaseSetup() {

    const { URI } = config;

    mongoose.connect(URI);

    mongoose.connection.on('error', (err) => {
        console.log(`Error connecting to database: ${err}`);
    });

    mongoose.connection.on('connected', () => {
        console.log("Successfully connected to the database");
        serverInit();
    });

}

function serverInit() {

    const { PORT } = config;

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    }).on('error', (err: string) => {
        console.error(`Error starting server: ${err}`);
    });

}

export function middlewareSetup() {

    // * Body Parser
    app.use(bodyParser.json());

    // * Cors
    app.use(cors());

    // * Morgan
    app.use(morgan('dev'));

    // * Auth middleware
    app.use(auth);

}

function routesSetup() {

    // * User routes
    app.use('/user', user);

}