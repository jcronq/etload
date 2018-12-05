import { HttpResponse } from './http.response';
import { Logger } from '../../common/utils';

export class HttpReply {
	static success(msg: any) {
		Logger.info('Replying to Client: ', msg);
		return {
			statusCode: 200,
			body: msg
		} as HttpResponse;
	}

	static error(error: any) {
		Logger.info('Replying to Client: ', error);
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		} as HttpResponse;
	}
}
