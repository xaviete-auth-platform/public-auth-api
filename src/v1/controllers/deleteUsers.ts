import { Request, Response} from "express";
import {HttpStatusCode as status} from "../config/status";
import {deleteUsersQuery} from "../services/user";
import queryParamsValidation from "../validators/queryParamsValidation";

export default async function (req: Request, res: Response) {

    // Validate query param
    const validQueryData = queryParamsValidation(req.body);

    if (validQueryData.status !== status.OK) {
        return res.status(validQueryData.status).send(validQueryData);
    }

    // Get project id from token
    const project_id = res.locals.token.id;

    // Delete user or users
    const response = await deleteUsersQuery(req.body.query, project_id);

    if (response.status !== status.OK) {
        return res.status(response.status).send(response);
    }

    res.status(status.OK).send({
        status: status.OK,
        message: response.message
    });

}