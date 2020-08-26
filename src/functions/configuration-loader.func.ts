import {Configuration} from '../interfaces/configuration.interface';
import isBlank from 'is-blank';
import {defaults} from '../configuration/default.config';

export function configurationLoader(config: Configuration): Configuration {
    if (isBlank(config.target.apiUrl)){
        config.target.apiUrl = defaults.target.apiUrl;
    }
    return config;
}
