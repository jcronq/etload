import { ProductWebModel } from '../models';
import { Action } from '../../../common';

export class ProductWebValidator implements Action {
	get name(): string {
		return 'Validate(ProductWebModel)';
	}

	async update(state: any): Promise<ProductWebModel> {
		return new Promise<ProductWebModel>((resolve, reject) => {
			if (state.title != null && state.owner != null) resolve(state);
			else reject('Invalid State');
		});
	}
}
