import { userExist, validateUser } from "../services/user";
import { Request, Response } from "express";
import { HttpStatusCode as status } from "../config/status";
import {validatePassword} from "../services/auth";
import {requestLog} from "../services/request";

export default async function (req: Request, res: Response) {

    try {

        // Validate user data
        const validate = await validateUser(req.body ? req.body : {});

        if (validate.status !== status.OK) {

            // Register the request
            await requestLog(validate);

            return res.status(validate.status).json(validate);
        }

        const {email, password} = req.body;

        // Get project id form token
        const project_id = res.locals.token.id;

        // Validate if user exist with the given email and project_id
        const user = await userExist(project_id, email);

        if (!user) {

            let response = {
                status: status.NOT_ACCEPTABLE,
                message: 'Invalid credentials. User no exist'
            }

            // Register the request
            await requestLog(response);

            return res.status(status.NOT_ACCEPTABLE).send(response);
        }

        // Validate if password is correct
        if (!validatePassword(password, user.password.toString())) {

            let response = {
                status: status.NOT_ACCEPTABLE,
                message: 'Invalid credentials'
            }

            // Register the request
            await requestLog(response);

            return res.status(status.NOT_ACCEPTABLE).send(response);
        }

        let response = {
            status: status.OK,
            message: 'Login successfully',
            user: user
        }

        // Register the request
        await requestLog(response);

        res.status(status.OK).send(response);

    } catch (e) {

        let response = {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }

        // Register the request
        await requestLog(response);

        res.status(status.INTERNAL_SERVER_ERROR).send(response);

    }
}
