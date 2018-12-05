import { Logger } from './logger';

export const EnsureObject = (input: string | object): object => {
	if (typeof input == 'string') {
		return JSON.parse(input);
	}
	return input;
};

export const getDataFromPostRequest = (event: any): object => {
	Logger.info('received post', event);
	Logger.info({ event: event });
	if (event.body == undefined) {
		throw 'Missing Product Object.';
	}
	return EnsureObject(event.body);
};
