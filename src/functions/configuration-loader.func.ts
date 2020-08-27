import {Configuration} from '..';
import isBlank from 'is-blank';
import {defaults} from '../configuration/default.config';
import {Vars} from '../vars';

export function configurationLoader(config: Configuration): Configuration {
    if (isBlank(config.target.apiUrl)) {
        config.target.apiUrl = defaults.target.apiUrl;
        Vars.loggy.info(`[Configuration Loader] Setting config.target.apiUrl to default (${config.target.apiUrl})`);
    }
    if (isBlank(config.webserviceConfig?.logging) || config.webserviceConfig?.logging == undefined) {
        const loggingEnabled = process.env.LOGGING === 'true';
        if (loggingEnabled) {
            if (config.webserviceConfig) {
                config.webserviceConfig.logging = loggingEnabled;
            } else {
                config.webserviceConfig = {
                    logging: loggingEnabled
                };
            }
            Vars.loggy.warn(`[Configuration Loader] Enabled config.webserviceConfig.logging because the LOGGING env variable is set to true`);
        }
    }
    if (isBlank(config.target.syncServiceId) && isBlank(config.target.syncServiceSecretKey)) {
        Vars.loggy.warn('[Configuration Loader] config.target.syncServiceId or config.target.syncServiceSecretKey is not configured or empty');
    }
    return config;
}
