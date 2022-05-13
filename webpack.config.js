const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );
const webpack = require( "webpack" );
const dotEnv = require( "dotenv-webpack" );

module.exports={ 
    devtool : "eval-source-map",
    mode : "development",
    resolve : {
        fallback : {
            fs : "empty"
        }
        
    },
    entry : {
        index : path.resolve( __dirname,"./src/index.js" ),
    },
    output : {
        filename : "main.js",
        path : path.resolve( __dirname,"dist" ),
        publicPath : "/"
    },
    plugins : [
        new HtmlWebpackPlugin( {
            template : "./public/index.html"
        } ),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new dotEnv()
    ],
    optimization : {
        moduleIds : "named"
    },
    devServer : {
        host : "localhost",
        port : 3000,
        compress : false,
        open : true,
        liveReload : true,
        historyApiFallback : true,
    },
    module : {
        rules : [
            {
                test : /\.css$/i,
                use : [ "style-loader","css-loader","postcss-loader" ]
            },
            {
                test : /\.m?js$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader",
                    options : {
                        presets : [ "@babel/preset-env" ],
                        plugins : [ "@babel/plugin-transform-runtime" ]
                    }
                }
            },
            {
                test : /\.(png|jpg|jpeg|svg|gif)$/,
                type : "asset/resource",
            },
            {
                test : /\.html$/,
                loader : "html-withimg-loader"
            }
        ]
    }
};