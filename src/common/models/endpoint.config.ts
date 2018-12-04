import { ActionCommand } from './action.command';
import { ReplyService } from '../services';

export interface EndpointConfiguration {
	actionList: ActionCommand[];
	replyService: ReplyService;
}
