var webpack = require('webpack');
var env = process.env.NODE_ENV;

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var config = {
	externals: {
	    'react': reactExternal
	},
	entry: [
		'./src/index.js'
	],
	output: {
	  //library: 'react-google-login-component',
	  libraryTarget: 'umd'
	},
	/*
	output: {
		path: __dirname + '/dist',
		filename: 'index.js'
	},
	*/
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css',
			exclude: /node_modules/
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	]
}

if (env === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
				warnings: false
			}
		})
	)
}

module.exports = config;
