const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const dotenv = require('dotenv-webpack');

module.exports = {
	entry: '/src/index.js', // Punto de entrada de la aplicación
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js'	// Directorio de salida donde van los archivos de producción
	},
	// mode: 'development', // Modo de desarrollo
	resolve: {
		extensions: ['.js'],
		alias: {	// Abreviaciones para importar rutas
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@templates': path.resolve(__dirname, 'src/templates'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@images': path.resolve(__dirname, 'src/assets/images'),
		}
	},
	// watch: true, // Permite refrescar el codigo final en tiempo real
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
		new miniCssExtractPlugin({
			filename: 'assets/[name].[contenthash].css'
		}),
		new copyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images"
				}
			]
		}),
		new dotenv()
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new terserPlugin()
		]
	}
}