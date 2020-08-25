export interface TargetDataFormat {
    mode: 'full' | 'delta';
    version: 1;
    tasks: AnySyncTask[];
    performOnNotMatchedRecords: NotMatchedRecordsAction;
}

type AnySyncTask = UpdateSyncTask | DeleteSyncTask;

interface GenericSyncTask {
    // this might be enhanced in the future
    where: { [columnName: string]: unknown };
}

interface UpdateSyncTask extends GenericSyncTask {
    type: 'update-data';
    update: { [columnName: string]: unknown };
    ifNotFound: NotFoundAction;
}

interface DeleteSyncTask extends GenericSyncTask {
    type: 'delete-data';
    ifNotFound: NotFoundAction.Skip | NotFoundAction.ThrowError;
}

enum NotFoundAction {
    Skip = 'skip',
    ThrowError = 'throw-error',
    CreateNewRecord = 'create-new',
}

enum NotMatchedRecordsAction {
    Skip = 'skip',
    ThrowError = 'throw-error',
    Delete = 'delete',
}
