import { Logger } from '../../common/utils';
import { GenerateGUID } from '../../common/utils';
import { Database } from './database';
import {
	CreateTableInput,
	TableDescription,
	DeleteTableInput,
	KeySchemaElement,
	AttributeDefinitions
} from 'aws-sdk/clients/dynamodb';
import { DynamoDB, AWSError } from 'aws-sdk';

const settings = {
	apiVersion: process.env.dynamoDbApiVersion
};

interface DynamoDbParams {
	TableName: string;
	Item: any;
}

export class DynamoDb implements Database {
	get name(): string {
		return 'DynamoDB';
	}

	documentClient: DynamoDB.DocumentClient;
	dynamoDB: DynamoDB;

	constructor(private region = 'us-east-1') {
		this.documentClient = new DynamoDB.DocumentClient({
			...settings,
			region: this.region
		});
	}

	public insert(table: string, item: any): Promise<boolean> {
		const params: DynamoDbParams = {
			TableName: table,
			Item: {
				...item,
				guid: GenerateGUID()
			}
		};
		return new Promise((resolve, reject) => {
			Logger.info(`adding item`, params);
			try {
				this.documentClient.put(
					params,
					(
						err: AWSError,
						data: DynamoDB.DocumentClient.PutItemOutput
					) => {
						if (err) {
							reject(false);
						} else {
							// data.ConsumedCapacity can be used to determine total capacity of the db writer.
							resolve(true);
						}
					}
				);
			} catch (error) {
				reject(error);
			}
		});
	}
	public query(table: string, searchPattern: any): Promise<any> {
		const params = {
			TableName: table,
			Key: searchPattern
		};
		return new Promise((resolve, reject) => {
			this.documentClient.get(
				params,
				(
					err: AWSError,
					data: DynamoDB.DocumentClient.GetItemOutput
				) => {
					if (err) {
						reject(
							`Unable to read item: ${JSON.stringify(
								err,
								undefined,
								2
							)}`
						);
					} else {
						resolve(data.Item);
					}
				}
			);
		});
	}
	public update(table: string, searchPattern: any, item: any): Promise<any> {
		throw 'update has not yet been programmed.';
	}

	private initializeDbConnection() {
		if (!this.dynamoDB) {
			this.dynamoDB = new DynamoDB({
				...settings,
				region: this.region
			});
		}
	}

	public listTables(): Promise<string[]> {
		this.initializeDbConnection();
		Logger.info('Requesting List of Tables: {}');
		return new Promise(async (resolve, reject) => {
			try {
				this.dynamoDB.listTables({}, (error, data) => {
					if (error) {
						Logger.error('DynamoDb.ListTables() failed');
						reject(error);
					} else {
						Logger.info('Returned tables: ', data.TableNames);
						resolve(data.TableNames);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	public describeTable(tableName: string): Promise<any> {
		Logger.info(`Requesting TableDescription of Table: ${tableName}`);
		return new Promise<TableDescription>(async (resolve, reject) => {
			this.dynamoDB.describeTable(
				{ TableName: tableName },
				(error, data) => {
					if (error) {
						reject(data);
					} else {
						Logger.info(
							`TableDescription for ${tableName}: `,
							data.Table
						);
						resolve(data.Table);
					}
				}
			);
		});
	}

	public createTable(tableDefinition: any): Promise<any> {
		this.initializeDbConnection();
		const tableInput: CreateTableInput = tableDefinition as CreateTableInput;
		Logger.info('Creating Table: ', tableInput);
		return new Promise(async (resolve, reject) => {
			try {
				this.dynamoDB.createTable(tableInput, (error, data) => {
					if (error) {
						Logger.error(error);
						reject(error);
					} else {
						Logger.info('table Created', data);
						resolve(data);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	public deleteTable(tableName: string): Promise<any> {
		this.initializeDbConnection();
		return new Promise((resolve, reject) => {
			const params: DeleteTableInput = {
				TableName: tableName
			};
			try {
				this.dynamoDB.deleteTable(params, (error, data) => {
					if (error) {
						Logger.error(error);
						reject(error);
					} else {
						Logger.info(data);
						resolve(data);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	private getKeysWithKeyType(
		table: TableDescription,
		keyType: string
	): TableDescription {
		console.log(
			'getKeysWithKeyType: \n\nTable:\n',
			table,
			'\n\nkeyType:\n',
			keyType,
			'\n\nKeySchema:\n',
			table.KeySchema,
			'\n\n'
		);
		const filteredKeySchema = table.KeySchema.filter(
			(keySchema: KeySchemaElement) =>
				keySchema.KeyType.toUpperCase() === keyType.toUpperCase()
		);
		const keyNames = filteredKeySchema.map(
			keySchema => keySchema.AttributeName
		);
		const attributes: AttributeDefinitions = table.AttributeDefinitions.filter(
			attribute => keyNames.indexOf(attribute.AttributeName) >= 0
		);
		const keys = {
			KeySchema: filteredKeySchema,
			AttributeDefinitions: attributes
		};
		return keys;
	}

	private getPrimaryKey(table: TableDescription): TableDescription {
		// Only one 'hash' key per table
		// That attribute is the primary key
		console.log('getPrimaryKey: ', table);
		return this.getKeysWithKeyType(table, 'HASH');
	}

	private getSecondaryKeys(table: TableDescription): TableDescription {
		return this.getKeysWithKeyType(table, 'RANGE');
	}
}
