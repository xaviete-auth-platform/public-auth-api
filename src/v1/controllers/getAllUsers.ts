import {fetchAllUsers} from "../services/user";
import { Request, Response } from "express";
import { HttpStatusCode as status } from "../config/status";

export default async function (req: Request, res: Response) {

    // Get data from token
    const token = res.locals.token;

    // Get all project users from the database
    const response = await fetchAllUsers(token.id);

    if (response.status !== status.OK) {
        return res.status(response.status).send(response);
    }

    res.status(status.OK).send(response);
}
