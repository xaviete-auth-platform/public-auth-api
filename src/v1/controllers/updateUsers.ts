import {Request, Response} from "express";
import queryParamsValidation from "../validators/queryParamsValidation";
import { HttpStatusCode as status } from "../config/status";
import {updateUsersByQuery} from "../services/user";

export default async function(req: Request, res: Response) {

    // Validate query params
    const validQueryData = queryParamsValidation(req.body);

    if (validQueryData.status !== status.OK) {
        return res.status(validQueryData.status).send(validQueryData);
    }

    // Validate new data param
    if (!req.body.newData) {
        return res.status(status.NOT_ACCEPTABLE).send({
            status: status.NOT_ACCEPTABLE,
            message: "newData property is required"
        });
    }

    const {query, newData} = req.body;
    const project_id = res.locals.token.id;

    const request = await updateUsersByQuery(query, newData, project_id);

    if (request.status !== status.OK) {
        return res.status(request.status).send(request);
    }

    res.status(status.OK).send({
        status: status.OK,
        message: request.message
    });

}