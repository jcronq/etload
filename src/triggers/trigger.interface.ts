import { Action } from 'src/functional';

export interface TriggerInterface {
	GetSubscription(runner: Action): Function;
}
