import fetch from 'node-fetch';
import FormData from 'form-data';
import {Configuration} from '../interfaces/configuration.interface';

export async function sendSyncRequest(config: Configuration) {
    const form = new FormData();
    form.append('a', "1");

    try {
        const response = await fetch(config.target.apiUrl as string, {
            method: 'post',
            body: form,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${config.target.syncServiceSecretKey}`
            }
        });
        const json = await response.json();
    } catch (e) {

    }
}

function getApiUrl(config: Configuration): string {
    return `${config.target.apiUrl}/api/v4/sync_services/${config.target.syncServiceId}/jobs`
}
