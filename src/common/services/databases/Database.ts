import { DbData } from '../../models';

export interface Database {
	insert(table: string, item: DbData): Promise<any>;
	update(table: string, searchPattern: any, item: DbData): Promise<any>;
	query(table: string, query: any): Promise<any>;
}
