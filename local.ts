import provideSyncService from './src/server';

provideSyncService({
    accessKey: 'efrgtidhsnfuwe',
    allowedIpAddresses:
        process.env.ALLOWED_IP_ADDRESSES == null || process.env.ALLOWED_IP_ADDRESSES === ''
            ? [] : (process.env.ALLOWED_IP_ADDRESSES).split(', '),
    mapping: (inputFile) => localMappingFunctionTest(inputFile),
    target: {
        syncServiceId: '',
        syncServiceSecretKey: ''
    },
    webserviceConfig: {
        logging: process.env.LOGGING === 'true'
    },
});

function localMappingFunctionTest(inputFile: Blob): boolean {
    return true;
}
