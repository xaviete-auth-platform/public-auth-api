import {Request, NextFunction, Response} from "express";
import {getDataFromToken} from "../services/auth";
import {HttpStatusCode as status} from "../config/status";

export default function(req: Request, res: Response, next: NextFunction) {

    // * Get data from token
    const authorization = getDataFromToken(req.headers.authorization);

    if (authorization.status !== status.OK) {
        return res.status(authorization.status).send(authorization);
    }

    // Save token information to locals
    res.locals.token = authorization.token;

    next();

}