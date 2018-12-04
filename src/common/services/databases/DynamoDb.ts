import { Logger, GenerateGUID } from '../../../common/utils';
import { Database } from './Database';
import { DbData } from '../../models/db.data';
import {
	CreateTableInput,
	TableDescription,
	DeleteTableInput,
	KeySchemaElement,
	AttributeDefinitions
} from 'aws-sdk/clients/dynamodb';
import { DynamoDB } from 'aws-sdk';

const settings = {
	apiVersion: process.env.dynamoDbApiVersion
};

interface DynamoDbParams {
	TableName: string;
	Item: DbData;
}

export class DynamoDb implements Database {
	documentClient: DynamoDB.DocumentClient;
	dynamoDB: DynamoDB;

	constructor() {
		this.documentClient = new DynamoDB.DocumentClient(settings);
	}

	public insert(table: string, item: DbData): Promise<any> {
		const params: DynamoDbParams = {
			TableName: table,
			Item: {
				...item,
				guid: GenerateGUID()
			}
		};
		return new Promise((resolve, reject) => {
			Logger.info(`adding item`, params);
			this.documentClient.put(params, (err: any, data: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
	public query(table: string, searchPattern: any): Promise<any> {
		throw 'query has not yet been programmed.';
	}
	public update(
		table: string,
		searchPattern: any,
		item: DbData
	): Promise<any> {
		throw 'update has not yet been programmed.';
	}

	private initializeDbConnection() {
		if (!this.dynamoDB) {
			this.dynamoDB = new DynamoDB(settings);
		}
	}

	public listTables(): Promise<string[]> {
		this.initializeDbConnection();
		Logger.info('Requesting List of Tables: {}');
		return new Promise(async (resolve, reject) => {
			this.dynamoDB.listTables({}, (error, data) => {
				if (error) {
					Logger.error('DynamoDb.ListTables() failed');
					reject(error);
				} else {
					Logger.info('Returned tables: ', data.TableNames);
					resolve(data.TableNames);
				}
			});
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
		const tableInput: CreateTableInput = tableDefinition as CreateTableInput;
		Logger.info('Creating Table: ', tableInput);
		return new Promise(async (resolve, reject) => {
			this.dynamoDB.createTable(tableInput, (error, data) => {
				if (error) {
					Logger.error(error);
					reject(error);
				} else {
					Logger.info('table Created', data);
					resolve(data);
				}
			});
		});
	}

	public deleteTable(tableName: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const params: DeleteTableInput = {
				TableName: tableName
			};
			this.dynamoDB.deleteTable(params, (error, data) => {
				if (error) {
					Logger.error(error);
					reject(error);
				} else {
					Logger.info(data);
					resolve(data);
				}
			});
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
