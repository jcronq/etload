import { TriggerInterface } from '../../trigger.interface';
import { HttpReply } from '../../../resources';
import { Action } from '../../../common';

export class HttpTrigger implements TriggerInterface {
	GetSubscription(runner: Action): Function {
		return async (event: any, context: any) => {
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
