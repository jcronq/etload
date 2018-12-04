import { DynamoDb as ChosenDatabase } from '../DynamoDb';
import { Database } from '../Database';
import { Action } from '../../../functional/Action';
import { DbData } from '../../../models';

export class DynamoDbWriteAction implements Action {
	db: Database = new ChosenDatabase();

	constructor(public tableName: string) {}

	update(data: any): Promise<any> {
		return new Promise<any>(async (resolve, reject) => {
			try {
				await this.db.insert(this.tableName, data as DbData);
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
}
