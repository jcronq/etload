import { Resource } from '../resource';

export interface FS extends Resource {
	write(path: string, obj: any): Promise<any>;
	read(path: string): Promise<any>;
}
