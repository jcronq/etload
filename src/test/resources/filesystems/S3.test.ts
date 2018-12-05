import { S3 } from '../../../resources/filesystems';
import { expect, assert } from 'chai';

describe('S3 Test', () => {
	const s3 = new S3();
	it('can manipulate text files on s3', async () => {
		const fileKey = ['etload-development-test', 'a/path/to/file.txt'];
		const fileData = 'delete_me';
		try {
			const writeResult = await s3.write(fileKey, fileData);
			console.log('s3 write success', writeResult);
			assert(writeResult);
		} catch (error) {
			console.log('s3 write failed', error);
			assert(false);
		}
		try {
			const readResult = (await s3.read(fileKey)).toString();
			console.log('s3 read success');
			expect(readResult).to.equals(fileData);
		} catch (error) {
			console.log('s3 read failed', error);
			assert(false);
		}
	});
});
