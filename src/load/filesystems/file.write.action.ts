import { FS } from '../../resources/filesystems';
import { Action } from '../../common/models/action';

export class FileWriteAction implements Action {
	get name(): string {
		return `${this.filesystem.name}-FileWriteAction`;
	}

	constructor(public filesystem: FS) {}
	update(input: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.filesystem.write(input.filename, input.data);
				resolve(input);
			} catch (error) {
				reject(error);
			}
		});
	}
}
