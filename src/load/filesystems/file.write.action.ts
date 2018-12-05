import { FS } from '../../resources/filesystems';
import { Action } from '../../common/models/action';

export class FileWriteAction implements Action {
	get name(): string {
		return `${this.filesystem.name}-FileWriteAction`;
	}

	constructor(public filesystem: FS, public filename: string) {}
	update(data: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.filesystem.write(this.filename, data);
				return data;
			} catch (error) {
				reject(error);
			}
		});
	}
}
