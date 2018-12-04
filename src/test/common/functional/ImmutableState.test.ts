import { ImmutableState } from '../../../common/functional/imutableState';
import { expect } from 'chai';

describe('Immutable State', () => {
	let immutableState: ImmutableState;
	const initialState = {
		string: 'test-string1',
		array: ['array-data1', 'array-data2'],
		date: new Date(),
		subObject: {
			string2: 'test-string2'
		}
	};

	beforeEach(() => {
		immutableState = new ImmutableState();
		immutableState.set(initialState);
	});

	it('set state adds new state and get returns it', () => {
		let currentState = immutableState.get();
		expect(currentState).to.deep.equals(initialState);
		const newState = {
			veryDifferentOptions: ['this', 'is', 'different']
		};
		immutableState.set(newState);
		currentState = immutableState.get();
		expect(currentState).to.deep.equals(newState);
	});

	it('can get versioned states', () => {
		const expectedStates = {
			initial: {
				index: 0,
				state: initialState
			},
			first: {
				index: 1,
				state: { veryDifferentOptions: ['this', 'is', 'different'] }
			},
			second: {
				index: 2,
				state: { thingsChangedAgain: 'can you tell' }
			}
		};
		let versionNumber: number = immutableState.getVersionNumber();
		expect(versionNumber, 'expecting version 0').equals(0);

		immutableState.set(expectedStates.first.state);
		versionNumber = immutableState.getVersionNumber();
		expect(versionNumber, 'expecting version 1').equals(1);

		immutableState.set(expectedStates.second.state);
		versionNumber = immutableState.getVersionNumber();
		expect(versionNumber, 'expecting version 2').equals(2);

		for (const metaStateKey of Object.keys(expectedStates)) {
			const index = expectedStates[metaStateKey].index;
			expect(
				immutableState.getSavedVersion(index),
				`${index} did not return expected state`
			).to.deep.equals(expectedStates[metaStateKey].state);
		}
	});

	it('states are immutable', () => {
		let currentState = immutableState.get();
		currentState.string = 'a-new-string';
		expect(immutableState.get()).to.deep.equals(initialState);

		const exactCopyOfNewState = {
			string: 'a-new-state'
		};
		let newState = {
			string: 'a-new-state'
		};
		immutableState.set(newState);
		newState.string = 'a-different-state';
		currentState = immutableState.get();
		expect(currentState).to.deep.equals(exactCopyOfNewState);
		expect(currentState).to.not.deep.equals(newState);
	});
});
