import { assert, expect } from 'chai';
import { ProductWebValidator } from '../../../../transform.examples/product';

describe('product validation', () => {
	const webInputValidator = new ProductWebValidator();
	beforeEach(() => {});

	it('passes on good input', async () => {
		const goodInput: any[] = [
			{
				title: 'a-name',
				owner: 'an-owner',
				description: 'a-type'
			}
		];
		for (const input of goodInput) {
			try {
				const output = await webInputValidator.update(input);
				expect(output).to.deep.equals(input);
			} catch (error) {
				assert(false, error);
			}
		}
	});

	it('throws on bad input', async () => {
		const badInput = [
			{
				owner: 'an-owner',
				description: 'a-description'
			},
			{
				title: 'a-title',
				description: 'a-description'
			},
			{
				owner: 'an-owner',
				title: 'a-title'
			}
		];
		for (const input of badInput) {
			try {
				await webInputValidator.update(input);
				assert(false, `expected a throw on bad input: ${input}`);
			} catch (correctlyThrewError) {
				assert(true);
			}
		}
	});
});
