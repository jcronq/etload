import { WebInputProduct } from '../models';
import { Action } from '../../../common/models/action';

export class WebInputProductValidator implements Action {
	async update(state: any): Promise<WebInputProduct> {
		return new Promise<WebInputProduct>((resolve, reject) => {
			if (state.title != null && state.owner != null) resolve(state);
			else reject('Invalid State');
		});
	}
}
