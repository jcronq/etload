import { ActionLoop } from '../../../common/models';
import { expect, assert } from 'chai';
import { AddOne, Sequence, ThrowsError } from './testing.actions';

describe('ActionLoop', () => {
	const initialState = 0;
	const addOne = new AddOne();
	const sequence = new Sequence();
	const throwsError = new ThrowsError();

	it('runs actions', async () => {
		const testLoop = new ActionLoop([
			addOne,
			addOne,
			addOne,
			addOne,
			sequence
		]);
		const result = await testLoop.update(initialState);
		const expectedResult = [0, 1, 2, 3, 4];
		expect(result).eqls(expectedResult);
	});

	it('throws when failure reached', async () => {
		const errorThrower = new ActionLoop([throwsError]);
		try {
			await errorThrower.update(initialState);
			assert(false, 'Expecting error to be thrown');
		} catch (err) {
			assert(true, 'Expected this to fail');
		}
	});
});
