import provideSyncService from './src/server';

provideSyncService({
    accessKey: "efrgtidhsnfuwe",
    allowedIpAddresses: ["::1", "127.0.0.1", "10.0.0.1"],
    mapping: (inputFile) => localMappingFunctionTest(inputFile),
    target: {
        apiUrl: "conclurer.com",
        syncServiceId: "213",
        syncServiceSecretKey: "fsdgemoirmngoernbdg"
    },
    webserviceConfig: {
        logging: process.env['LOGGING'] === 'true'
    },
});

function localMappingFunctionTest(inputFile: Blob): boolean {
    return true;
}
