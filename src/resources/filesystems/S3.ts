import * as AWS from 'aws-sdk';
import { Logger } from '../../common/utils';
import { FS } from './fs';
import { AWSError } from 'aws-sdk';

const settings = { apiVersion: process.env.s3ApiVersion };

export interface ObjectParams {
	Bucket: string;
	Key: string;
	Body?: any;
}

export class S3 implements FS {
	get name(): string {
		return 'S3';
	}
	private s3: AWS.S3 = new AWS.S3(settings);

	constructor() {}

	private getBucketAndPath(key: string | string[]): string[] {
		const invalidKeyMsg: string =
			'Error: Key must be of the format "<bucket-name>/<path to file>/<filename>" or an array, with the first variable being the bucket';
		let splitKey: string[];
		if (typeof key == 'string') {
			splitKey = key.split('/');
			if (splitKey.length < 2) {
				throw invalidKeyMsg;
			}
		} else if (key instanceof Array) {
			splitKey = key;
		} else {
			throw invalidKeyMsg;
		}
		const bucket = splitKey[0];
		const path: string = splitKey.slice(1).join('/');
		return [bucket, path];
	}

	// Follow the pattern for key-naming convention.
	// <bucket-name>/<path->/<-to->/<-file>/filename
	// Or be an array with the bucket as the first variable.
	public read(key: string | string[]): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				const [bucket, path] = this.getBucketAndPath(key);
				Logger.info(`reading '${key}' from '${bucket}'`);
				const params: ObjectParams = {
					Bucket: bucket,
					Key: path
				};
				this.s3.getObject(
					params,
					(err: AWSError, data: AWS.S3.Types.GetObjectOutput) => {
						if (err) reject(err);
						else resolve(data.Body);
					}
				);
			} catch (error) {
				reject(error);
			}
		});
	}

	public write(key: string | string[], data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				const [bucket, path] = this.getBucketAndPath(key);
				Logger.info(`writing '${key}' to '${bucket}'`);
				const params: ObjectParams = {
					Bucket: bucket,
					Key: path,
					Body: data
				};
				this.s3.putObject(
					params,
					(err: AWSError, data: AWS.S3.Types.PutObjectOutput) => {
						if (err) reject(err);
						else resolve(true);
					}
				);
			} catch (error) {
				reject(error);
			}
		});
	}
}
