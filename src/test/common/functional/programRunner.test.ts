import { ProgramRunner } from '../../../common/functional/programRunner';
import { ActionCommand } from '../../../common/models/action.command';
import { Action } from '../../../common/models/action';
import { expect, assert } from 'chai';

console.log('runner');
new ProgramRunner();

describe('Program Runner', () => {
	class ThrowsError implements Action {
		update(state: number): Promise<number> {
			return new Promise((resolve, reject) => {
				reject('Nope');
			});
		}
	}
	class AddOne implements Action {
		update(state: number): Promise<number> {
			return new Promise((resolve, reject) => {
				resolve(state + 1);
			});
		}
	}
	class Sequence implements Action {
		update(state: number): Promise<number[]> {
			return new Promise((resolve, reject) => {
				let array = [];
				if (state >= 0) {
					for (let i = 0; i <= state; i++) {
						array = array.concat(i);
					}
				} else {
					for (let i = 0; i >= state; i--) {
						array = array.concat(i);
					}
				}
				resolve(array);
			});
		}
	}
	const initialState = 0;
	const programRunner = new ProgramRunner();
	it('runs actions', async () => {
		const addOne = new AddOne();
		const actionList: ActionCommand[] = [
			{ name: 'addOne', action: addOne },
			{ name: 'addOne', action: addOne },
			{ name: 'addOne', action: addOne },
			{ name: 'addOne', action: addOne },
			{ name: 'sequence', action: new Sequence() }
		];
		const result = await programRunner.execute(actionList, initialState);
		const expectedResult = [0, 1, 2, 3, 4];
		expect(result).eqls(expectedResult);
	});
	it('throws when failure reached', async () => {
		const actionList: ActionCommand[] = [
			{ name: 'thisWillFail', action: new ThrowsError() }
		];
		try {
			await programRunner.execute(actionList, initialState);
			assert(false, 'Expecting error to be thrown');
		} catch (err) {
			assert(true, 'Expected this to fail');
		}
	});
});
