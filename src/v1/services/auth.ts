import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {auth} from "../config/auth";
import {HttpStatusCode as status} from "../config/status";

export function hashPassword(password: string) {
    return hashSync(password, genSaltSync(8));
}

export function validatePassword(password: string, hash: string) {
    return compareSync(password, hash);
}

export function getDataFromToken(token: string) {

    try {

        return {
            status: status.OK,
            token: jwt.verify(token, auth.secret)
        }

    } catch (err) {

        return {
            status: status.UNAUTHORIZED,
            message: "Invalid token",
            error: err
        };
    }
}