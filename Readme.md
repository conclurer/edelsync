# Edelsync Package

This package provides an abstract implementation for syncing customer data between their APIs and our Edelog Software.

## Setting up

```shell script
npm install
# starting dev server with logging enabled
LOGGING=TRUE npm run dev 

# start production server
npm start
```

## Environment Variables

<table>
    <thead>
        <td>Variable</td>
        <td>Values</td>
    </thead>
    <tr>
        <td><code>LOGGING</code></td>
        <td><code>true</code> or <code>false</code></td>
    </tr>
    <tr>
        <td><code>SYNC_SERVICE_API_DOMAIN</code></td>
        <td><code>https://app.edelog.com</code></td>
    </tr>
    <tr>
        <td><code>ACCESS_KEY</code></td>
        <td>String; The key needed to authorize to this api</td>
    </tr>
    <tr>
        <td><code>SYNC_SERVICE_ID</code></td>
        <td>String; The Edelog sync service ID</td>
    </tr>
    <tr>
        <td><code>SYNC_SERVICE_SECRET_KEY</code></td>
        <td>String; The Edelog secret key</td>
    </tr>
    <tr>
        <td><code>ALLOWED_IP_ADDRESSES</code></td>
        <td><code>::1, 127.0.0.1, 10.0.0.1</code> (separated with <code>, `</code>) </td>
    </tr>
</table>

## Minimal Configuration
```ts
import provideSyncService from './src/server';
import {NotMatchedRecordsAction, TargetDataFormat} from './src/interfaces/schema.interface'; import {NotFoundAction} from './schema.interface';

provideSyncService({
    accessKey: 'efrgtidhsnfuwe',
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

```


## Full Configuration

```ts
import provideSyncService from './src/server';
import {NotMatchedRecordsAction, TargetDataFormat} from './src/interfaces/schema.interface';
import {Configuration} from './src/interfaces/configuration.interface'; import {NotFoundAction} from './schema.interface';

provideSyncService({
    accessKey: 'efrgtidhsnfuwe',
    allowedIpAddresses:
        process.env.ALLOWED_IP_ADDRESSES == null || process.env.ALLOWED_IP_ADDRESSES === ''
            ? [] : (process.env.ALLOWED_IP_ADDRESSES).split(', '),
    mapping: (inputFilePaths) => mappingFunction(inputFilePaths),
    errorHandler: (errorMessage, config) => handleError(errorMessage, config),
    target: {
        syncServiceId: '',
        syncServiceSecretKey: ''
    },
    webserviceConfig: {
        logging: process.env.LOGGING === 'true',
    },
});

async function mappingFunction(inputFilePaths: string[]): Promise<TargetDataFormat> {
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
    // handle errors here
}

```

## Todo

* Send request to Copy Server if something fails
* Send request to Master Server if something fails
