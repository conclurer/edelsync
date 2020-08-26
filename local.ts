import provideSyncService from './src/server';
import {NotMatchedRecordsAction, TargetDataFormat} from './src/interfaces/schema.interface';

provideSyncService({
    accessKey: 'efrgtidhsnfuwe',
    allowedIpAddresses:
        process.env.ALLOWED_IP_ADDRESSES == null || process.env.ALLOWED_IP_ADDRESSES === ''
            ? [] : (process.env.ALLOWED_IP_ADDRESSES).split(', '),
    mapping: (inputFilePaths) => localMappingFunctionTest(inputFilePaths),
    target: {
        syncServiceId: '',
        syncServiceSecretKey: ''
    },
    webserviceConfig: {
        logging: process.env.LOGGING === 'true'
    },
});

async function localMappingFunctionTest(inputFilePaths: string[]): Promise<TargetDataFormat> {
    console.log(inputFilePaths)
    return {
        mode: 'delta',
        version: 1,
        tasks: [],
        performOnNotMatchedRecords: NotMatchedRecordsAction.Skip
    }
}
