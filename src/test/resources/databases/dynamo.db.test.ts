import { DynamoDb } from '../../../resources/databases';
import { expect, assert } from 'chai';

describe('DynamoDb Test', () => {
	let db: DynamoDb;
	const testTable = 'automated-test';
	const testTableDefinition = {
		TableName: testTable,
		KeySchema: [
			{ AttributeName: 'name', KeyType: 'HASH' },
			{ AttributeName: 'value', KeyType: 'RANGE' }
		],
		AttributeDefinitions: [
			{ AttributeName: 'name', AttributeType: 'S' },
			{ AttributeName: 'value', AttributeType: 'S' }
		],
		ProvisionedThroughput: {
			ReadCapacityUnits: 5,
			WriteCapacityUnits: 5
		}
	};

	beforeEach(() => {
		db = new DynamoDb('us-east-1');
	});

	it('can manipulate a DynamoDb', async () => {
		const testObj = { name: 'this is a test', value: 'a value' };
		try {
			const insertResult = await db.insert(testTable, testObj);
			console.log('insert success', insertResult);
			assert(insertResult);
		} catch (error) {
			console.log('insert failed', error);
			assert(false);
		}
		try {
			const queryResult = await db.query(testTable, testObj);
			console.log('query success', queryResult);
			expect(queryResult.name).to.equals(testObj.name);
			expect(queryResult.value).to.equals(testObj.value);
		} catch (error) {
			console.log('query failed', error);
			assert(false);
		}
	});
});
