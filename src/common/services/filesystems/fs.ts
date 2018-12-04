export interface FS {
	write(path: string, obj: any): Promise<any>;
	read(path: string): Promise<any>;
}
