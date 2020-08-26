import {TargetDataFormat} from './schema.interface';

export interface Configuration {
    target: ConfigurationTarget;
    accessKey: string | null;
    allowedIpAddresses: string[] | null;
    webserviceConfig?: ConfigurationWebservice;
    mapping: (inputFilePaths: string[]) => Promise<TargetDataFormat>;
}

export interface ConfigurationWebservice {
    logging?: boolean;
}

export interface ConfigurationTarget {
    apiUrl?: string,
    syncServiceId: string,
    syncServiceSecretKey: string
}
