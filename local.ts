import provideSyncService from './src/server';
import {NotMatchedRecordsAction, TargetDataFormat} from './src/interfaces/schema.interface';
import {Configuration} from './src/interfaces/configuration.interface';

provideSyncService({
    accessKey: '',
    mapping: (inputFilePaths) => mappingFunction(inputFilePaths),
    target: {
        syncServiceId: '',
        syncServiceSecretKey: ''
    },
});

async function mappingFunction(inputFilePaths: string[]): Promise<TargetDataFormat> {
    console.log(inputFilePaths)
    return {
        mode: 'delta',
        version: 1,
        tasks: [],
        performOnNotMatchedRecords: NotMatchedRecordsAction.Skip
    }
}

async function handleError(errorMessage: string, config: Configuration) {
    // todo
}
