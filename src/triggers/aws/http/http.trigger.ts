import { TriggerInterface } from '../../trigger.interface';
import { HttpReply } from '../../../resources';
import { Action } from '../../../common';
import { Context } from 'aws-lambda';

export class HttpTrigger implements TriggerInterface {
	GetSubscription(runner: Action): Function {
		return async (event: any, context: Context) => {
			try {
				const input: any = event.body;
				const output = await runner.update(input);
				return HttpReply.success(output);
			} catch (Err) {
				return HttpReply.error(Err);
			}
		};
	}
}
