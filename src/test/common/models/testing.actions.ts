import { Action } from '../../../common/models';

export class ThrowsError implements Action {
	get name(): string {
		return 'ThrowError';
	}
	update(state: number): Promise<number> {
		return new Promise((resolve, reject) => {
			reject('Nope');
		});
	}
}
export class AddOne implements Action {
	get name(): string {
		return 'AddOne';
	}
	update(state: number): Promise<number> {
		return new Promise((resolve, reject) => {
			resolve(state + 1);
		});
	}
}
export class Sequence implements Action {
	get name(): string {
		return 'Sequence';
	}
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
