const path = require('path');

module.exports = {
	stats: 'minimal',
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx']
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js'
	},
	target: 'node',
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				use: [
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	}
};
