import { ReplyService } from '../ReplyService';
import { WebResponse } from '../../models';
import { Logger } from '../../utils';

export class HttpReplyService implements ReplyService {
	success(msg: any) {
		Logger.info('Replying to Client: ', msg);
		return {
			statusCode: 200,
			body: msg
		} as WebResponse;
	}

	error(error: any) {
		Logger.info('Replying to Client: ', error);
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		} as WebResponse;
	}
}
