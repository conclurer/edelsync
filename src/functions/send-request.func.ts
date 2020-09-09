import fetch from 'node-fetch';
import FormData from 'form-data';
import {Configuration} from '..';
import {Vars} from '../vars';
import {TargetDataFormat} from '..';

export async function sendSyncRequest(data: TargetDataFormat, config: Configuration) {
    const form = new FormData();
    form.append('requestPayload', JSON.stringify(data));

    try {
        const response = await fetch(getApiUrl(config), {
            method: 'post',
            body: form,
            headers: {
                'Authorization': `Bearer ${config.target.syncServiceSecretKey}`
            }
        });
        const json = await response.json();
        Vars.loggy.log('[Sync-Request] Response is ', json);
    } catch (e) {
        handleFail(e, config);
        throw e;
    }
}

function getApiUrl(config: Configuration): string {
    return `${config.target.apiUrl}/api/v4/sync_services/${config.target.syncServiceId}/jobs`;
}

function handleFail(message: string, config: Configuration) {
    if (config.errorHandler) {
        config.errorHandler(message, config);
    }

    // todo send notification to monitoring
}
