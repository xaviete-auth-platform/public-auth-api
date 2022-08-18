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

    // TODO: Validar que todo vaya bien para enviar el request
    try {
        await axios.post(config.ADMIN_URL + "/request/create", body);
    } catch (e){
        console.log(e);
    }

}