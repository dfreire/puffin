var config = {
	entry: ['./jsx/index.jsx'],
	output: {
		filename: './public/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components|public)/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: [/\.css$/],
            exclude: /(node_modules|bower_components|public)/,
			loader: 'style!css'
		}]
	}
};

module.exports = config;
