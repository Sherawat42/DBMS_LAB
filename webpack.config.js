const path = require('path');
const config = {
	//Tell webpack the root file of our server application
	entry: './src/client/client.js',

	module: {
		rules: [
			{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						'react',
						'stage-0',
						['env', { targets: {browsers: ['last 2 versions']}}]
					]
				}
			},
		]
	},
	// Tell webpack where to put the output file after generating it
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	}
}


module.exports = config;
