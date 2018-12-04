import { Action } from '../../../common/models/Action';
import { GenerateGUID } from '../../../common/utils';
import { DbProduct } from '../models';

export class ProductWebToDb implements Action {
	constructor(public tableName: string) {}

	update(state: any): Promise<any> {
		return new Promise<any>((resolve: Function, reject: Function) => {
			try {
				const guid: string = GenerateGUID();
				resolve({
					title: state.title,
					owner: state.owner,
					description: state.description,
					guid: guid
				} as DbProduct);
			} catch (error) {
				reject(error);
			}
		});
	}
}
