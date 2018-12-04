import { ProgramRunner } from './programRunner';
import { Context } from 'aws-lambda';
import { EndpointConfiguration } from '../models/endpoint.config';

export const Endpoint = (endpointConfig: EndpointConfiguration) => {
	return async function(event: any, context: Context) {
		try {
			const input: any = event.body;
			const output = await new ProgramRunner().execute(
				endpointConfig.actionList,
				input
			);
			return endpointConfig.replyService.success(output);
		} catch (Err) {
			return endpointConfig.replyService.error(Err);
		}
	};
};
