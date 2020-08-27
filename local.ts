import provideSyncService from './src/server';
import {NotFoundAction, NotMatchedRecordsAction, TargetDataFormat} from './src';
import {Configuration} from './src';

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
        version: 1,
        updateCollections: [
            {
                databaseName: '',
                performOnNotMatchedRecords: NotMatchedRecordsAction.Skip,
                tasks: [
                    {
                        type: 'update-data',
                        where: {},
                        update: {
                            test: 'd'
                        },
                        ifNotFound: NotFoundAction.CreateNewRecord
                    }
                ]
            }
        ],
    }
}

async function handleError(errorMessage: string, config: Configuration) {
    // todo
}
