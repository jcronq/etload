import {
	ProductWebModel,
	ProductDbModel
} from '../../../../transform.examples/product';
import { TransformProductWebToDb } from '../../../../transform.examples/product';
import { expect } from 'chai';

describe('product transform for DB', () => {
	const testDb = 'test-db';
	const initialState: ProductWebModel = {
		title: 'test-attachment',
		owner: 'test-owner',
		description: ''
	};

	let productWebToDb = new TransformProductWebToDb();

	it('transforms data', async () => {
		const newState: ProductDbModel = await productWebToDb.update(
			initialState
		);
		expect(newState).to.have.property('guid').to.not.be.undefined;
		expect(newState).to.deep.include(initialState);
	});
});
