import {config} from '../config/setup';
import axios from "axios";

export async function requestLog(body: any, project_id: string) {

    body['project_id'] = project_id;

    // TODO: Validar que todo vaya bien
    try {
        const restult = await axios.post(config.ADMIN_URL + "/request/create", body);
        console.log("requestLog", restult);
    } catch (e){
        console.log(e);
    }
}