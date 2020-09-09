import {Configuration, ConfigurationInput} from '..';
import isBlank from 'is-blank';
import {defaults} from '../configuration/default.config';
import {Vars} from '../vars';

export function configurationLoader(config: ConfigurationInput): Configuration {
    if (isBlank(config.webserviceConfig?.logging) || config.webserviceConfig?.logging == undefined) {
        const loggingEnabled = process.env.LOGGING === 'true';
        if (loggingEnabled) {
            if (config.webserviceConfig) {
                config.webserviceConfig.logging = loggingEnabled;
                Vars.loggy.loggingEnabled = loggingEnabled;
            } else {
                config.webserviceConfig = {
                    logging: loggingEnabled
                };
                Vars.loggy.loggingEnabled = loggingEnabled;
            }
            Vars.loggy.warn(`[Configuration Loader] Enabled config.webserviceConfig.logging because the LOGGING env variable is set to true`);
        }
    }

    config.target = config.target || {};

    if (isBlank(config.target.apiUrl)) {
        config.target.apiUrl = process.env.SYNC_SERVICE_API_DOMAIN != undefined ? process.env.SYNC_SERVICE_API_DOMAIN : defaults.target.apiUrl;
        const urlSource = process.env.SYNC_SERVICE_API_DOMAIN != undefined ? 'env var SYNC_SERVICE_API_DOMAIN' : 'default';
        const message = `[Configuration Loader] Setting config.target.apiUrl ${urlSource}: (${config.target.apiUrl})`;
        Vars.loggy.warn(message);
    }
    if (isBlank(config.target.syncServiceId)) {
        config.target.syncServiceId = process.env.SYNC_SERVICE_ID != undefined ? process.env.SYNC_SERVICE_ID : '';
        if (isBlank(config.target.syncServiceId)) {
            Vars.loggy.warn('[Configuration Loader] config.target.syncServiceId is not configured or empty. Also, no ENV variable SYNC_SERVICE_ID was found. Did you forget to configure them?');
        }
    }
    if (isBlank(config.target.syncServiceSecretKey)) {
        config.target.syncServiceSecretKey = process.env.SYNC_SERVICE_SECRET_KEY != undefined ? process.env.SYNC_SERVICE_SECRET_KEY : '';
        if (isBlank(config.target.syncServiceSecretKey)) {
            Vars.loggy.warn('[Configuration Loader] config.target.syncServiceSecretKey is not configured or empty. Also, no ENV variable SYNC_SERVICE_SECRET_KEY was found. Did you forget to configure them?');
        }
    }
    if (isBlank(config.accessKey)) {
        config.accessKey = process.env.ACCESS_KEY != undefined ? process.env.ACCESS_KEY : '';
        if (isBlank(config.accessKey)) {
            Vars.loggy.warn('[Configuration Loader] config.accessKey is not configured or empty. Also, no ENV variable ACCESS_KEY was found. Did you forget to configure them?');
        }
    }

    return config as Configuration;
}
