import { Resource } from '../resource';

export interface Database extends Resource {
	insert(table: string, item: any): Promise<any>;
	update(table: string, searchPattern: any, item: any): Promise<any>;
	query(table: string, query: any): Promise<any>;
}
