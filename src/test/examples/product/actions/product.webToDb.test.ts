import {
	WebInputProduct,
	DbProduct
} from '../../../../examples/product/models';
import { ProductWebToDb } from '../../../../examples/product/actions';
import { expect } from 'chai';

describe('product transform for DB', () => {
	const testDb = 'test-db';
	const initialState: WebInputProduct = {
		title: 'test-attachment',
		owner: 'test-owner',
		description: ''
	};

	let productWebToDb: ProductWebToDb;

	beforeEach(() => {
		productWebToDb = new ProductWebToDb(testDb);
	});

	it('transforms data', async () => {
		const newState: DbProduct = await productWebToDb.update(initialState);
		expect(newState).to.have.property('guid').to.not.be.undefined;
		expect(newState).to.deep.include(initialState);
	});
});
