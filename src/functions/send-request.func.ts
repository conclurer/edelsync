import fetch from 'node-fetch';
import FormData from 'form-data';
import {Configuration} from '..';
import {Vars} from '../vars';
import {DataSyncRequestBody} from '..';

/**
 * Create a data sync job at Edelog's API
 * @param data
 * @param config
 * @internal
 */
export async function sendSyncRequest(data: DataSyncRequestBody, config: Configuration) {
  const form = new FormData();
  form.append('requestPayload', JSON.stringify(data));

  try {
    const response = await fetch(
      `${config.target.apiUrl}/api/v4/sync_services/${config.target.syncServiceId}/jobs`,
      {
        method: 'post',
        body: form,
        headers: {
          'Authorization': `Bearer ${config.target.syncServiceSecretKey}`
        }
      }
    );
    const json = await response.json();
    Vars.loggy.log('[Sync-Request] response is ', json);
  } catch (e) {
    handleFail(e, config);
    throw e;
  }
}

/**
 * Submits an error message to Edelog's API
 * @param message
 * @param config
 * @internal
 */
export async function sendErrorMessage(message: string | { toString: () => string }, config: Configuration) {
  const form = new FormData();
  form.append('errorMessage', typeof message === 'string' ? message : message.toString());

  try {
    const response = await fetch(
      `${config.target.apiUrl}/api/v4/sync_services/${config.target.syncServiceId}/jobs/error`, {
        method: 'post',
        body: form,
        headers: {
          'Authorization': `Bearer ${config.target.syncServiceSecretKey}`
        }
      }
    );
    const json = await response.json();
    Vars.loggy.log('[Sync-Request] error message response is ', json);
  } catch (e) {
    throw e;
  }
}

function handleFail(message: string, config: Configuration) {
  if (config.errorHandler) {
    config.errorHandler(message, config);
  }

  sendErrorMessage(message, config);
}
