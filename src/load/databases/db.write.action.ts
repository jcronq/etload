import { Database } from '../../resources/databases';
import { Action } from '../../common';

export class DbWriteAction<ChosenDatabase> implements Action {
	get name(): string {
		return `${this.db.name}.${this.tableName}-writer`;
	}
	constructor(public db: Database, public tableName: string) {}

	update(data: any): Promise<any> {
		return new Promise<any>(async (resolve, reject) => {
			try {
				await this.db.insert(this.tableName, data);
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
}
