import { HttpStatusCode as status } from "../config/status";

export default function(body: any) {

    if (!body.query) {
        return {
            status: status.NOT_ACCEPTABLE,
            message: "Query parameter is required"
        }
    }

    if (typeof body.query !== 'object') {
        return {
            status: status.NOT_ACCEPTABLE,
            message: "Query parameter must be an object"
        }
    }

    if (Object.keys(body.query).length === 0) {
        return {
            status: status.NOT_ACCEPTABLE,
            message: "Query parameter can't be empty"
        }
    }

    if (Object.keys(body.query).length > 1) {
        return {
            status: status.NOT_ACCEPTABLE,
            message: "Query parameter can only contain one query"
        }
    }

    return {
        status: status.OK,
        message: "Valid query"
    }

}