import {config} from '../config/setup';
import axios from "axios";

export async function requestLog(data: any) {

    const { status, message, ...rest } = data;

    const body = {
        project_id: global.project_id.id,
        code: status,
        message: message,
        others: rest
    }

    try {

        const response = await axios.post(config.ADMIN_URL + "/request/create", body);

        if (response.data.status !== status.CREATED) {

            return {
                status: response.data.status,
                message: response.data.message,
                error: response.data.error
            };

        }

        return {
            status: status.CREATED,
            message: 'Request created successfully'
        }

    } catch (e){

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }

    }

}