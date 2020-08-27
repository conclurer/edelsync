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
        <td><code>TRUE</code> or <code>FALSE</code></td>
    </tr>
    <tr>
        <td><code>ALLOWED_IP_ADDRESSES</code></td>
        <td><code>::1, 127.0.0.1, 10.0.0.1</code> (separated with <code>, `</code>) </td>
    </tr>
</table>

## Minimal Configuration
```ts
import provideSyncService from './src/server';
import {NotMatchedRecordsAction, TargetDataFormat} from './src/interfaces/schema.interface';

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
        mode: 'delta',
        version: 1,
        tasks: [],
        performOnNotMatchedRecords: NotMatchedRecordsAction.Skip
    }
}

```


## Full Configuration

```ts
import provideSyncService from './src/server';
import {NotMatchedRecordsAction, TargetDataFormat} from './src/interfaces/schema.interface';
import {Configuration} from './src/interfaces/configuration.interface';

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
        mode: 'delta',
        version: 1,
        tasks: [],
        performOnNotMatchedRecords: NotMatchedRecordsAction.Skip
    }
}

async function handleError(errorMessage: string, config: Configuration) {
    // handle errors here
}

```

## Todo

* Send request to Copy Server if something fails
* Send request to Master Server if something fails
