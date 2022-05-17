const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: '/src/index.js', // Punto de entrada de la aplicación
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'	// Directorio de salida donde van los archivos de producción
	},
	resolve: {
		extensions: ['.js']
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/i,
				use: [
					miniCssExtractPlugin.loader,
					'css-loader',
					'stylus-loader'
				]
			},
			{
				test: /\.png|\.jpg/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html'
		}),
		new miniCssExtractPlugin(),
		new copyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images"
				}
			]
		})
	],
}