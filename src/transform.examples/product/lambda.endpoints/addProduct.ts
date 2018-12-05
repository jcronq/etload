import { TransformProductWebToDb, ProductWebValidator } from '../transforms';
import { DbWriteAction } from '../../../load/databases';

import { ActionLoop } from '../../../common';
import { Database, DynamoDb } from '../../../resources/databases';
import { Trigger } from '../../../triggers';

const db: Database = new DynamoDb();
const tableName: string = 'DB_TABLE';
const persistProductToDB = new ActionLoop([
	new ProductWebValidator(),
	new TransformProductWebToDb(),
	new DbWriteAction(db, tableName)
]);

const httpTrigger = new Trigger.aws.http.HttpTrigger();

export const addProduct = httpTrigger.GetSubscription(persistProductToDB);
