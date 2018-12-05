import { AddOne, ThrowsError, Sequence } from './testing.actions';
import { expect, assert } from 'chai';

describe('Action Test', () => {
	const addOne = new AddOne();
	const throwsError = new ThrowsError();
	const sequence = new Sequence();
	it('updates stuff', async () => {
		const oneAddOne = await addOne.update(1);
		const zeroToFour = await sequence.update(4);
		console.log(oneAddOne);
		expect(2).to.equal(oneAddOne);
		expect(zeroToFour).eqls([0, 1, 2, 3, 4]);
		try {
			await throwsError.update(2);
			assert(false);
		} catch (error) {
			assert(true);
		}
	});
});
