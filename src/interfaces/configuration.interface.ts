export interface Configuration {
    target: ConfigurationTarget;
    accessKey: string;
    allowedIpAddresses: string[] | null;
    webserviceConfig: {[columnName: string] : unknown};
    mapping: (inputFile: Blob) => boolean;
}

export interface ConfigurationTarget {
    apiUrl: string,
    syncServiceId: string,
    syncServiceSecretKey: string
}
