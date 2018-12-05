import { VersionedState } from '../../../common/models';
import { expect } from 'chai';

describe('Versioned State', () => {
	let versionedState: VersionedState;
	const initialState = {
		string: 'test-string1',
		array: ['array-data1', 'array-data2'],
		date: new Date(),
		subObject: {
			string2: 'test-string2'
		}
	};

	beforeEach(() => {
		versionedState = new VersionedState();
		versionedState.set(initialState);
	});

	it('set state adds new state and get returns it', () => {
		let currentState = versionedState.get();
		expect(currentState).to.deep.equals(initialState);
		const newState = {
			veryDifferentOptions: ['this', 'is', 'different']
		};
		versionedState.set(newState);
		currentState = versionedState.get();
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
		let versionNumber: number = versionedState.getVersionNumber();
		expect(versionNumber, 'expecting version 0').equals(0);

		versionedState.set(expectedStates.first.state);
		versionNumber = versionedState.getVersionNumber();
		expect(versionNumber, 'expecting version 1').equals(1);

		versionedState.set(expectedStates.second.state);
		versionNumber = versionedState.getVersionNumber();
		expect(versionNumber, 'expecting version 2').equals(2);

		for (const metaStateKey of Object.keys(expectedStates)) {
			const index = expectedStates[metaStateKey].index;
			expect(
				versionedState.getSavedVersion(index),
				`${index} did not return expected state`
			).to.deep.equals(expectedStates[metaStateKey].state);
		}
	});

	it('states are immutable', () => {
		let currentState = versionedState.get();
		currentState.string = 'a-new-string';
		expect(versionedState.get()).to.deep.equals(initialState);

		const exactCopyOfNewState = {
			string: 'a-new-state'
		};
		let newState = {
			string: 'a-new-state'
		};
		versionedState.set(newState);
		newState.string = 'a-different-state';
		currentState = versionedState.get();
		expect(currentState).to.deep.equals(exactCopyOfNewState);
		expect(currentState).to.not.deep.equals(newState);
	});
});
