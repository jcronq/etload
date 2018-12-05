import { VersionedState } from './versioned.state';
import { Logger } from '../utils';
import { Action } from './action';

export class ActionLoop implements Action {
	get name(): string {
		return `ActionLoop{ ${this.actionList.toString()} }`;
	}
	state: VersionedState = new VersionedState();

	constructor(public actionList: Action[]) {}

	async update(initialState: any): Promise<any> {
		return new Promise<any>(async (resolve, reject) => {
			try {
				Logger.state('Initial State', 0, initialState);
				this.state.set(initialState);
				for (const action of this.actionList) {
					const currentState = this.state.get();
					Logger.state(
						action.name,
						this.state.getVersionNumber(),
						currentState
					);
					const newState = await action.update(currentState);
					this.state.set(newState);
				}
				resolve(this.state.get());
			} catch (error) {
				reject(error);
			}
		});
	}
}
