import { FS } from '../fs';
import { S3 as ChosenFs } from '../S3';
import { Action } from '../../../functional/Action';
import { DbData } from '../../../models';

export class S3WriteAction implements Action {
	fs: FS = new ChosenFs();
	constructor(public filename: string) {}
	update(data: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.fs.write(this.filename, data as DbData);
				return data;
			} catch (error) {
				reject(error);
			}
		});
	}
}
