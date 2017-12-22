const path = require("path");
const webpack = require("webpack");

const library = "[name]_lib";

module.exports = {
    entry: {
        vendors:[
            "react",
            "react-dom",
            "moment"
        ],
        antd: [
            "antd/lib/tabs",
            "antd/lib/switch",
            "antd/lib/modal",
        ],
        antdStyles: ["antd/dist/antd.min.css"]
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "",
        library
    },
    module:{
        rules:[{
            test: /\.css/,
            use: [
                "style",
                "css",
            ]
        }]
    },
    externals: {},
	resolveLoader: {
		moduleExtensions: ["-loader"]
    },
    plugins: [
        new webpack.DllPlugin({
            path: "./dist/[name]-manifest.json",
            name: library,
            context: path.resolve(__dirname, "./dist")
        }),
        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /en|cn/
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            chunks: ["vendors","antd"],
            minChunks: 2
        })
    ]
}