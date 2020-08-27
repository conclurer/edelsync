import {Configuration} from '../interfaces/configuration.interface';
import isBlank from 'is-blank';
import {defaults} from '../configuration/default.config';
import {Vars} from '../vars';

export function configurationLoader(config: Configuration): Configuration {
    if (isBlank(config.target.apiUrl)){
        config.target.apiUrl = defaults.target.apiUrl;
        Vars.loggy.info(`[Configuration Loader] Setting config.target.apiUrl to default (${config.target.apiUrl})`);
    }
    if (isBlank(config.target.syncServiceId) && isBlank(config.target.syncServiceSecretKey)){
        Vars.loggy.warn("[Configuration Loader] config.target.syncServiceId or config.target.syncServiceSecretKey is not configured or empty");
    }
    return config;
}
