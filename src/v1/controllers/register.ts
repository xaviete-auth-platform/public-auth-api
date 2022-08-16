import { Request, Response } from "express";
import {createUser, saveUser, validateUser} from "../services/user";
import {HttpStatusCode as status} from "../config/status";

export default async function (req: Request, res: Response) {

    // * Validate user data
    const validate = await validateUser(req.body ? req.body : {});

    if (validate.status !== status.OK) {
        return res.status(validate.status).json(validate);
    }

    // * Create object user
    const user = createUser(req.body, res.locals.token.id);

    // * Save user
    const response = await saveUser(user);

    // * Handle response
    if (response.status !== status.CREATED) {
        return res.status(response.status).send(response);
    }

    res.status(status.CREATED).send({ status: status.CREATED, user: response.data });

}