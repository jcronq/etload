import { Resource } from '../resource';

export interface FS extends Resource {
	write(path: string | string[], obj: any): Promise<any>;
	read(path: string | string[]): Promise<any>;
}
