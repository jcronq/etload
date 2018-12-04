export class Logger {
	public static log(level: string, message: string | object, ...args: any) {
		if (typeof message === 'object') message = JSON.stringify(message);
		let output: object = {
			level: level,
			message: message
		};
		if (args) {
			output = {
				...output,
				additionalData: args
			};
		}
		const outputString = JSON.stringify(output);
		console.log(outputString);
	}

	public static info(message: string | object, ...args: any) {
		this.log('info', message, ...args);
	}

	public static error(message: string | object, ...args: any) {
		this.log('error', message, ...args);
	}

	public static warn(message: string | object, ...args: any) {
		this.log('warn', message, ...args);
	}

	public static state(actionName: string, version: number, state: any) {
		console.log(
			JSON.stringify({
				level: 'state-change',
				action: actionName,
				version: version,
				state: state
			})
		);
	}
}
