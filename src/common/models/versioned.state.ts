import { deepCopy } from '../utils/deepCopy';

export class VersionedState {
	versionedState: any[] = [];

	getVersionNumber(): number {
		return this.versionedState.length - 1;
	}

	getSavedVersion(index: number): any {
		return deepCopy(this.versionedState[index]);
	}

	get(): any {
		return deepCopy(this.versionedState[this.getVersionNumber()]);
	}

	set(state: any) {
		this.versionedState.push(deepCopy(state));
	}
}
