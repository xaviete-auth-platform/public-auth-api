import { userExist, validateUser } from "../services/user";
import { Request, Response } from "express";
import { HttpStatusCode as status } from "../config/status";
import {validatePassword} from "../services/auth";

export default async function (req: Request, res: Response) {

    // Validate user data
    const validate = await validateUser(req.body ? req.body : {});

    if (validate.status !== status.OK) {
        return res.status(validate.status).json(validate);
    }

    const {email, password} = req.body;

    // Get project id form token
    const project_id = res.locals.token.id;

    // Validate if user exist with the given email and project_id
    const user = await userExist(project_id, email);

    if (!user) {

        return res.status(status.NOT_ACCEPTABLE).send({
            status: status.NOT_ACCEPTABLE,
            message: 'Invalid credentials. User no exist'
        });
    }

    // Validate if password is correct
    if (!validatePassword(password, user.password.toString())) {

        return res.status(status.NOT_ACCEPTABLE).send({
            status: status.NOT_ACCEPTABLE,
            message: 'Invalid credentials'
        });
    }

    res.status(status.OK).send({
        status: status.OK,
        message: 'Login successfully',
        user: user
    });
}
