export interface TargetDataFormat {
    mode: 'full' | 'delta';
    version: 1;
    tasks: AnySyncTask[];
    performOnNotMatchedRecords: NotMatchedRecordsAction;
}

export type AnySyncTask = UpdateSyncTask | DeleteSyncTask;

export interface GenericSyncTask {
    // this might be enhanced in the future
    where: { [columnName: string]: unknown };
}

export interface UpdateSyncTask extends GenericSyncTask {
    type: 'update-data';
    update: { [columnName: string]: unknown };
    ifNotFound: NotFoundAction;
}

export interface DeleteSyncTask extends GenericSyncTask {
    type: 'delete-data';
    ifNotFound: NotFoundAction.Skip | NotFoundAction.ThrowError;
}

export enum NotFoundAction {
    Skip = 'skip',
    ThrowError = 'throw-error',
    CreateNewRecord = 'create-new',
}

export enum NotMatchedRecordsAction {
    Skip = 'skip',
    ThrowError = 'throw-error',
    Delete = 'delete',
}
