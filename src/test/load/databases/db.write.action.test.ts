import { DbWriteAction } from '../../../load/databases';
import { DynamoDb, Database } from '../../../resources/databases';
import { Action } from '../../../common';
import { expect } from 'chai';

describe('DbWriteAction Test', () => {
	const testTable = 'automated-test';
	let db: Database;
	let writeAction: Action;
	beforeEach(() => {
		db = new DynamoDb('us-east-1');
		writeAction = new DbWriteAction(db, testTable);
	});

	it('should actually write to the db', async () => {
		const testObj = { name: 'this is a test', value: 'a value' };
		const writeActionResult = await writeAction.update(testObj);
		console.log('writeActionResult: ', writeActionResult);
		expect(testObj).eqls(writeActionResult);

		const queryResults = await db.query(testTable, testObj);
		expect(queryResults.name).to.equals(testObj.name);
		expect(queryResults.value).to.equals(testObj.value);
	});
});
