export interface Configuration {
    target: ConfigurationTarget;
    accessKey: string | null;
    allowedIpAddresses: string[] | null;
    webserviceConfig?: ConfigurationWebservice;
    mapping: (inputFile: Blob) => boolean;
}

export interface ConfigurationWebservice {
    logging?: boolean;
}

export interface ConfigurationTarget {
    apiUrl?: string,
    syncServiceId: string,
    syncServiceSecretKey: string
}
