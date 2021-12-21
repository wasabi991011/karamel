process.env.NODE_ENV = "development";
const base = require("./webpack.base");
const webpack = require("webpack");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsPlugin = require("@soda/friendly-errors-webpack-plugin");

module.exports = Object.assign(base, {
	mode: "development",
	module: {
		rules: base.module.rules.concat([
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "ts-loader",
				options: {
					transpileOnly: true
				}
			}
		])
	},
	plugins: base.plugins.concat([
		new webpack.WatchIgnorePlugin({ paths: [/.*\.scss\.d\.ts/] }),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": `"development"`
		}),
		new ForkTsCheckerPlugin({
			eslint: {
				files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
			}
		}),
		new FriendlyErrorsPlugin()
	]),
	devtool: "inline-source-map"
});
