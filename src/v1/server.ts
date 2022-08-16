import express, { Request, Response } from 'express';
import { serverSetup } from "./services/initSetup";

// Export the app as a module
export const app = express();

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("I'm working!");
});

serverSetup();