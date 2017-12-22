const { resolve, join } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack");

const rootPath = resolve('./src');

module.exports = {
	entry: {
		main: [
            "./src/main"
        ]
	},
	output: {
		path: resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: `js/[name].js`,
		chunkFilename: `js/[name].js`
	},
	resolve: {
		extensions: ['.webpack.js', '.js', '.jsx', '.tsx', '.ts'],
		modules: [
			rootPath,
			"node_modules"
		]
	},
	module: {
		rules: [{
            test: /\.tsx?$/, 
            loader: ['awesome-typescript']
		}, {
			test: /\.css/, 
			use: [
                "style",
                "css"
			]
		}],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/assets/ejs/template.ejs",
			inject: 'body',
			inlineSource: 'manifest.*js$'
        }),
	].concat(
        ["vendors","antd","antdStyles","common"].map((name)=>(
            new webpack.DllReferencePlugin({
                manifest: `./dist/${name}-manifest.json`,
                context: resolve(__dirname, "./dist")
            })
        ))
    ),
	resolveLoader: {
		moduleExtensions: ["-loader"]
    },
    devServer: {
        contentBase: resolve(__dirname, "./dist"),
        port: 9000
    }
}
