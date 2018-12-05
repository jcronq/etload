import { Action } from '../../../common';
import { GenerateGUID } from '../../../common/utils';
import { ProductDbModel } from '../models';

export class TransformProductWebToDb implements Action {
	get name(): string {
		return 'Product.Transform(Web -> DB)';
	}
	constructor() {}

	update(state: any): Promise<any> {
		return new Promise<any>((resolve: Function, reject: Function) => {
			try {
				const guid: string = GenerateGUID();
				resolve({
					title: state.title,
					owner: state.owner,
					description: state.description,
					guid: guid
				} as ProductDbModel);
			} catch (error) {
				reject(error);
			}
		});
	}
}
