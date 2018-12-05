import { FileWriteAction } from '../../../load';
import { FS, S3 } from '../../../resources';
import { expect } from 'chai';

describe('', () => {
	const s3Bucket = 'etload-development-test';
	const filename = [s3Bucket, 'a/test/file.txt'];
	const data = 'delete_me';
	let writeFile: FileWriteAction;
	let s3: FS;

	beforeEach(() => {
		s3 = new S3();
		writeFile = new FileWriteAction(s3);
	});

	it('should actually write a file', async () => {
		const writeFileInput = { filename: filename, data: data };
		const file = await writeFile.update(writeFileInput);
		expect(file).eqls(writeFileInput);
		const resultData = (await s3.read(filename)).toString();
		expect(resultData).to.equals(data);
	});
});
