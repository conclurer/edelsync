import fetch from 'node-fetch';
import FormData from 'form-data';
import {Configuration} from '../interfaces/configuration.interface';
import {Vars} from '../vars';
import {TargetDataFormat} from '../interfaces/schema.interface';

export async function sendSyncRequest(data: TargetDataFormat, config: Configuration) {
    const form = new FormData();
    form.append('request', JSON.stringify(data));

    try {
        const response = await fetch(getApiUrl(config), {
            method: 'post',
            body: form,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${config.target.syncServiceSecretKey}`
            }
        });
        const json = await response.json();
        Vars.loggy.log("[Sync-Request] Response is ", json);
    } catch (e) {
        handleFail();
        throw e;
    }
}

function getApiUrl(config: Configuration): string {
    return `${config.target.apiUrl}/api/v4/sync_services/${config.target.syncServiceId}/jobs`
}

function handleFail() {

}
