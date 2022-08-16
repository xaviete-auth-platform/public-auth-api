import { Request, Response} from "express";
import {HttpStatusCode as status} from "../config/status";
import {fetchUsersQuery} from "../services/user";
import queryParamsValidation from "../validators/queryParamsValidation";

export default async function (req: Request, res: Response) {

    // Validate query param
    const validQueryData = queryParamsValidation(req.body);

    if (validQueryData.status !== status.OK) {
        return res.status(validQueryData.status).send(validQueryData);
    }

    // Get project id from token
    const project_id = res.locals.token.id;

    // Search the user
    const request = await fetchUsersQuery(req.body.query, project_id);

    if (request.status !== status.OK) {
        return res.status(request.status).send(request);
    }

    res.status(status.OK).send({
        status: status.OK,
        user: request
    });

}