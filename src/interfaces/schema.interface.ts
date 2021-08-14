/**
 * Wrapper for all instructions of the Data Sync Service
 * as submitted as JSON payload via HTTP.
 */
export interface DataSyncRequestBody {
  /**
   * Version of the DataSyncRequestBody
   */
  version: 1;

  /**
   * All update collection requested to be performed during this Data Sync Job.
   */
  updateCollections: DatabaseUpdateCollection[];
}

/**
 * Any SyncTask (either update or delete)
 */
export type AnySyncTask = UpdateSyncTask | DeleteSyncTask;

/**
 * Generic value that can be written or read from an Edelog database column.
 */
export type GenericColumnValue = null | string | number | boolean | string[] | undefined;

/**
 * Contains all operations intended to be applied to a specific Edelog database.
 * You can supply multiple update collections per data sync request.
 * The update collections are executed in their order.
 */
export interface DatabaseUpdateCollection {
  /**
   * Technical name of the targeted Edelog database
   */
  databaseName: string;

  /**
   * All tasks that has to be done during the data sync.
   */
  tasks: AnySyncTask[];

  /**
   * Action that has to be performed on the data records
   * that have not been affected by this DatabaseUpdateCollection.
   */
  performOnNotMatchedRecords: NotMatchedRecordsAction;
}

export type DataSelectStatement = GenericDataSelectStatement | OrganizationalUnitSelectStatement;

/**
 * Statement to select data from an Edelog database.
 */
export interface GenericDataSelectStatement {
  /**
   * Technical name of the targeted Edelog database
   */
  databaseName: string;

  /**
   * Name of the field that shall be returned.
   */
  select: string;

  /**
   * One or more conditions (logical AND) to select the matching
   * data record from the Edelog database.
   */
  where: { [columnName: string]: GenericColumnValue };

  /**
   * If set to true only the first record is returned.
   * Otherwise an array of matching values is returned.
   * Defaults to false.
   */
  returnFirstRecord?: boolean;
}

/**
 * Statement to return an OrganizationalUnit
 */
export interface OrganizationalUnitSelectStatement {
  /**
   * Technical name of the targeted Edelog database
   */
  databaseName: 'system/organizational_units';

  /**
   * Name of the field that shall be returned.
   */
  select: 'id' | 'fqn' | 'email' | 'display_name' | 'first_name' | 'last_name' | 'type' | 'created_at' | 'updated_at' | 'app_id';

  /**
   * One or more conditions (logical AND) to select the matching
   * data record from the Edelog database.
   */
  where: {
    id?: string;
    fqn?: string;
    email?: string | null;
    display_name?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    type?: 'User' | 'RestrictedUser' | 'TechnicalUser' | 'Group' | 'DynamicGroup';
  };

  /**
   * If set to true only the first record is returned.
   * Otherwise an array of matching values is returned.
   * Defaults to false.
   */
  returnFirstRecord?: boolean;
}

/**
 * Base interface for all sync tasks.
 */
interface GenericSyncTask {
  /**
   * One or more conditions (logical AND) to select the targeted
   * data record from the Edelog database.
   */
  where: { [columnName: string]: GenericColumnValue | GenericDataSelectStatement };
}

export interface UpdateSyncTask extends GenericSyncTask {
  type: 'update-data';

  /**
   * Instruction on which data shall be written into which column
   * of the targeted data record.
   * This can either be a static value or the result of a DataSelectStatement
   */
  update: { [columnName: string]: GenericColumnValue | DataSelectStatement };

  /**
   * Action that shall be done if no record has been found as result of the
   * `where` statement.
   */
  ifNotFound: NotFoundAction;
}

export interface DeleteSyncTask extends GenericSyncTask {
  type: 'delete-data';

  /**
   * Action that shall be done if no record has been found as result of the
   * `where` statement.
   */
  ifNotFound: NotFoundAction.Skip | NotFoundAction.ThrowError;
}

/**
 * Actions that can be done if a target record has not been found.
 */
export enum NotFoundAction {
  /**
   * Skips the record, nothing else is done.
   */
  Skip = 'skip',

  /**
   * Throws an error, this will abort the data sync job.
   */
  ThrowError = 'throw-error',

  /**
   * Creates a new record with the given values.
   */
  CreateNewRecord = 'create-new',
}

/**
 * Actions that can be done for data records not affected by a DatabaseUpdateCollection.
 */
export enum NotMatchedRecordsAction {
  /**
   * Skips these records, nothing else is done.
   */
  Skip = 'skip',

  /**
   * Throws an error, this will abort the data sync job.
   */
  ThrowError = 'throw-error',

  /**
   * Deletes these records.
   */
  Delete = 'delete',
}
