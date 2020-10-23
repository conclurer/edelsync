export interface DataSyncRequestBody {
  version: 1;
  updateCollections: DatabaseUpdateCollection[];
}

export type AnySyncTask = UpdateSyncTask | DeleteSyncTask;

export type GenericColumnValue = null | string | number | boolean | string[];

export interface DatabaseUpdateCollection {
  databaseName: string;
  tasks: AnySyncTask[];
  performOnNotMatchedRecords: NotMatchedRecordsAction;
}

export interface DataSelectStatement {
  databaseName: string;
  select: string;
  where: { [columnName: string]: GenericColumnValue };
  returnFirstRecord?: boolean;
}

export interface GenericSyncTask {
  // this might be enhanced in the future
  where: { [columnName: string]: GenericColumnValue | DataSelectStatement };
}

export interface UpdateSyncTask extends GenericSyncTask {
  type: 'update-data';
  update: { [columnName: string]: GenericColumnValue | DataSelectStatement };
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
