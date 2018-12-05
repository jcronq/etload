import { Nameable } from './nameable';

export interface Action extends Nameable {
	update(state: any): Promise<any>;
}
