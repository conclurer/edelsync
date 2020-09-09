import {TargetDataFormat} from './schema.interface';

export interface ConfigurationInput {
    target?: Partial<ConfigurationTarget>;
    accessKey?: string;
    allowedIpAddresses?: string[];
    webserviceConfig?: Partial<ConfigurationWebservice>;
    mapping: (inputFilePaths: string[]) => Promise<TargetDataFormat>;
    errorHandler?: (errorMessage: string, config: Configuration) => void;
}

export interface Configuration {
    target: ConfigurationTarget;
    accessKey: string;
    allowedIpAddresses: string[];
    webserviceConfig: ConfigurationWebservice;
    mapping: (inputFilePaths: string[]) => Promise<TargetDataFormat>;
    errorHandler: (errorMessage: string, config: Configuration) => void;
}

export interface ConfigurationWebservice {
    logging: boolean;
}

export interface ConfigurationTarget {
    apiUrl: string,
    syncServiceId: string,
    syncServiceSecretKey: string
}
