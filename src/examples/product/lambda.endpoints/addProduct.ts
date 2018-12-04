import { EndpointConfiguration } from '../../../common/models/endpoint.config';
import { ProductWebToDb } from '../actions';
import { WebInputProductValidator } from '../actions/webInput.product.validator';
import { HttpReplyService } from '../../../common/services/http';
import { DynamoDbWriteAction } from '../../../common/services/Databases';
import { ActionCommand } from '../../../common/models/action.command';
import { Endpoint } from '../../../common/functional/endpoint';

const tableName: string = 'DB_TABLE';
const actionList: ActionCommand[] = [
	{
		action: new WebInputProductValidator(),
		name: 'validate'
	},
	{
		action: new ProductWebToDb(tableName),
		name: 'transform'
	},
	{
		action: new DynamoDbWriteAction(tableName),
		name: 'persist to db'
	}
];

const replyService = new HttpReplyService();

export const addProduct = Endpoint({
	actionList: actionList,
	replyService: replyService
} as EndpointConfiguration);
