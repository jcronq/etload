export interface Action {
	update(state: any): Promise<any>;
}
