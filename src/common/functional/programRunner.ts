import { ImmutableState } from './imutableState';
import { Logger } from '../utils';
import { ActionCommand } from '../models/action.command';

export class ProgramRunner {
	state: ImmutableState = new ImmutableState();

	constructor() {
		console.log('a program runner has been created!');
	}

	async execute(
		actionList: ActionCommand[],
		initialState: any
	): Promise<any> {
		return new Promise<any>(async (resolve, reject) => {
			try {
				Logger.state('Initial State', 0, initialState);
				this.state.set(initialState);
				for (const command of actionList) {
					const currentState = this.state.get();
					Logger.state(
						command.name,
						this.state.getVersionNumber(),
						currentState
					);
					const newState = await command.action.update(currentState);
					this.state.set(newState);
				}
				resolve(this.state.get());
			} catch (error) {
				reject(error);
			}
		});
	}
}
