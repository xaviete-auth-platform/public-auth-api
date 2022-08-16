import User from "../models/User";
import {HttpStatusCode as status} from "../config/status";
import {userValidation} from "../validators/userValidators";
import {hashPassword} from "./auth";

export function createUser(data: any, project_id: string) {

    const { email, password, ...rest } = data;

    return new User({
        project_id: project_id,
        email: email,
        password: hashPassword(password),
        properties: rest.properties
    });
}

export async function saveUser(user: any) {

    try {

        const { project_id, email } = user;

        if (await userExist(project_id, email)) {

            // TODO: Return project name instead of project_id
            return {
                status: status.CONFLICT,
                message: `User already exist in ${project_id}`
            };
        }

        // Save user into de database
        const data = await user.save();

        return { status: status.CREATED, data: data };

    } catch (err) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: err.message,
            error: err
        };
    }
}

export async function userExist(project_id: string, email: string) {

    return User.findOne({
        $and: [
            { project_id: project_id },
            { email: email }
        ]
    }).select('+password');
}

export async function validateUser(user: any) {

    const { error } = await userValidation.validate(user);

    if (error) {

        return {
            status: status.NOT_ACCEPTABLE,
            message: error.message,
            error: error
        };

    }

    return {
        status: status.OK,
        message: 'User validated successfully'
    }

}

export async function fetchAllUsers(project_id: string){

    try {

        // Get all users from project id
        const users = await User.find({ project_id: project_id });

        if (users.length === 0) {
            return {
                status: status.OK,
                message: 'There are no users in this project yet'
            };
        }

        return {
            status: status.OK,
            users: users
        }

    } catch (e) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }
}

export async function fetchUsersQuery(query: object, project_id: string) {

    try {

        const response = await User.find({$and: [
            query, { project_id: project_id }
        ]});

        if (response.length === 0) {
            return {
                status: status.NOT_FOUND,
                message: 'User/s not found'
            };
        }

        return {
            status: status.OK,
            user: response
        }

    } catch (e) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }
}

export async function deleteUsersQuery(query: object, project_id: string) {

    try {

        const response = await User.deleteMany({$and: [
                query, { project_id: project_id }
            ]});

        if (response.deletedCount === 0) {
            return {
                status: status.NOT_FOUND,
                message: 'No users deleted'
            };
        }

        return {
            status: status.OK,
            message: `${ response.deletedCount } user/s removed successfully`
        }

    } catch (e) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }

}

export async function updateUsersByQuery(query: any, data: object, project_id: string) {

    try {

        const response = await User.updateMany({$and: [
            query, { project_id: project_id }
        ]}, {$set: data});


        if (!response.acknowledged || response.modifiedCount === 0) {
            return {
                status: status.OK,
                message: 'No users updated'
            }
        }

        return {
            status: status.OK,
            message: `${response.modifiedCount} user/s updated successfully`
        }

    } catch (e) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }
}