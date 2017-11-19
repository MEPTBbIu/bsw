'use strict';
'esversion:6';

const path = require('path');
const devServerCfg = require('./webpack-dev-server.config');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils');
// global.Promise = require("bluebird");
const ModuleScopePlugin = require('react-dev-utils/modulescopeplugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WatchmanPlugin = require("webpack-watchman-plugin");
const Externals = require('./webpack.externals');
// var publicPath = "dist";
// const cssName =
//    process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
// const jsName =
//     process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';


const PATHS = {
    root: path.resolve(__dirname, './'),
    nodeModules: path.resolve(__dirname, './node_modules'),
    src: path.resolve('./src'),
    dist: path.resolve('./dist'),
    images: path.resolve(__dirname, './images'),
    assets: path.resolve(__dirname, './assets'),
};

const DEV_SERVER = devServerCfg();

/* const defaultPort = "8080";
const protocol = "http";
const urls = WebpackDevServerUtils.prepareUrls(protocol, DEV_SERVER.host, defaultPort);
var _port = WebpackDevServerUtils.choosePort(DEV_SERVER.host, defaultPort)
	.then((res) => {
		console.log({ urls }, { _port });
	});	  */

/* const DEV_SERVER_1 = {
	//   hot: true,
	//   hotOnly: false,
	historyApiFallback: true,
	overlay: true,
	headers: { "Access-Control-Allow-Origin": "*" }

	//  stats: 'verbose',
	// proxy: {
	//   '/api': 'http://localhost:3000'
	// },
};	  */

// console.log({ PATHS, publicPath });
const plugins = [
   // new WatchmanPlugin({ projectPath: PATHS.src }),
    new webpack.ProvidePlugin({
  //      $: './node_modules/jquery',
  //      jQuery: 'jquery',
  //      'window.jQuery': 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
 //   new DashboardPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
    }),
    new ExtractTextPlugin('/src/**/*.css'),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'true',
        favicon: './src/assets/icon/favicon.ico',
        cache: false,
        showErrors: true,
    }),
    new CleanWebpackPlugin([PATHS.dist + '/**/*'], {
        root: PATHS.root,
        verbose: true,
        dry: false,
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
    }),
    new ModuleScopePlugin(PATHS.src, [PATHS.root + '/package.json']),
    new CopyWebpackPlugin(
        [{
                from: 'src/web.config',
                to: '/',
            }, /**/
            {
                from: 'src/manifest.json',
                to: 'manifest.json',
            }, /*	*/
            {
                from: 'src/assets/icon',
                to: 'assets/icon',
            },
            {
                from: 'src/assets/fonts',
                to: 'assets/fonts',
            },
            {
                from: 'src/assets/images',
                to: 'assets/images',
			} ,
			{
				from: 'src/assets/css',
				to: 'assets/css',
			}
        ]),
];

const isDev = true;
const isSourceMap = isDev;


const config = {
    externals: Externals,
    devtool: 'cheap-module-source-map', /*isDev ? 'eval-source-map' : 'source-map',*/
    entry: [
        //require.resolve('react-dev-utils/webpackHotDevClient'),
       // 'webpack-dev-server/client?http://192.168.1.11:8080',
       // 'webpack/hot/only-dev-server',
        './src/index.tsx',
        //'./src/assets/scss/textfield/mdc-textfield.scss'
    ],
    context: PATHS.root,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: ['node_modules', 'src'],
    },
    devServer: DEV_SERVER,
    plugins,
    output: {
        path: PATHS.dist,
        filename: isDev ? '[name].js' : '[name].[hash].js',
        publicPath: '',
        pathinfo: true
    },
    module: {
        rules: [{
                test: /\.(tsx|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                        'sourceMap': isSourceMap,
                        'target': 'es6',
                        'isolatedModules': true,
                        'noEmitOnError': false,

                    },
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'assets/icon/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.svg/,
                include: PATHS.src,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.(woff|woff2|ttf|eot)/,
                include: path.resolve(PATHS.assets, "fonts"),
                loader: "url-loader?limit=1"
            },
            {
                test: /\.json$/,
                include: PATHS.src,
                loader: "json-loader"
            }, /**/
            /*	{
            	test: /\.scss$/,
            	loader: ExtractTextPlugin.extract(
            		{
            			fallback: 'style-loader',
            			use: 'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader?browsers=last 4 versions!sass-loader?outputStyle=expanded&sourceMap'
            		} )
            },	  */

            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    //   require.resolve('postcss-loader'),
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js',
                            },
                            //   parser: 'sugarss',
                            //  exec: true,
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                //   require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },

};


// console.log({ config });
module.exports = config;


/*    {
					test: /\.css$/,
					loader: 'postcss-loader',
					options: {
						plugins: (loader) => [
							require('postcss-modules-local-by-default')(),
							require('postcss-import')({
								root: PATHS.src, //loader.resourcePath,
								addDependencyTo: webpack
							}),
							require('postcss-cssnext')({
								addDependencyTo: webpack,
								assets: PATHS.assets,
								autoprefixer: true,
								//  DashboardPlugin: DashboardPlugin
							}),
							require('cssnano')({
								safe: true,
								sourcemap: true,
								autoprefixer: false
							})
						]
					}
								} ,*/
/* require.resolve('style-loader'),
		  {
			  loader: require.resolve('css-loader'),
			  options: {
				  importLoaders: 1,
			  },
		  },
		  {
			  loader: require.resolve('postcss-loader'),
			  options: {
				  // Necessary for external CSS imports to work
				  // https://github.com/facebookincubator/create-react-app/issues/2677
				  ident: 'postcss',
				  plugins: () => [
					  require('postcss-flexbugs-fixes'),
					  autoprefixer({
						  browsers: [
							  '>1%',
							  'last 4 versions',
							  'Firefox ESR',
							  'not ie < 9', // React doesn't support IE8 anyway
						  ],
						  flexbox: 'no-2009',
					  }),
				  ],
			  },
		  },
	 ],
 },*/

/*  {
			   oneOf: [
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than specified limit in bytes as data URLs to avoid requests.
					// A missing `test` is equivalent to a match.
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
					// Compile .tsx?
					 {
						  test: /\.(ts|tsx)$/,
						  include: PATHS.src,
						  loader: require.resolve('ts-loader'),
					  },
					// "postcss" loader applies autoprefixer to our CSS.
					// "css" loader resolves paths in CSS and adds assets as dependencies.
					// "style" loader turns CSS into JS modules that inject <style> tags.
					// In production, we use a plugin to extract that CSS to a file, but
					// in development "style" loader enables hot editing of CSS.
					{
						test: /\.css$/,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									// Necessary for external CSS imports to work
									// https://github.com/facebookincubator/create-react-app/issues/2677
									ident: 'postcss',
									plugins: () => [
										require('postcss-flexbugs-fixes'),
										autoprefixer({
											browsers: [
												'>1%',
												'last 4 versions',
												'Firefox ESR',
												'not ie < 9', // React doesn't support IE8 anyway
											],
											flexbox: 'no-2009',
										}),
									],
								},
							},
						],
					},
					// "file" loader makes sure those assets get served by WebpackDevServer.
					// When you `import` an asset, you get its (virtual) filename.
					// In production, they would get copied to the `build` folder.
					// This loader don't uses a "test" so it will catch all modules
					// that fall through the other loaders.
					   {
						   // Exclude `js` files to keep "css" loader working as it injects
						   // it's runtime that would otherwise processed through "file" loader.
						   // Also exclude `html` and `json` extensions so they get processed
						   // by webpacks internal loaders.
						   exclude: [/\.js$/, /\.html$/],
						   loader: require.resolve('file-loader'),
						   options: {
							   name: 'static/media/[name].[hash:8].[ext]',
						   },
					   }
				]
			},*/
/* {
		test: /\.css$/,
		include: PATHS.src,
		loader: ExtractTextPlugin.extract(
				"style-loader",
				"css-loader!postcss-loader"
		)
},*/
/*
						 {
										test: /\.less$/,
										include: 'src',
										loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
								},
			{
				test: /\.gif$/,
				include: PATHS.images,
				loader: "url-loader?limit=10000&mimetype=image/gif"
			},
			{
				test: /\.jpg$/,
				include: PATHS.images,
				loader: "url-loader?limit=10000&mimetype=image/jpg"
			},
			{
				test: /\.png$/,
				include: PATHS.images,
				loader: "url-loader?limit=10000&mimetype=image/png"
			},
			{
				test: /\.svg/,
				include: PATHS.images,
				loader: "url-loader?limit=26000&mimetype=image/svg+xml"
			},
			{
				test: /\.(woff|woff2|ttf|eot)/,
				include: path.resolve(PATHS.assets, "fonts"),
				loader: "url-loader?limit=1"
			},
			{
				test: /\.json$/,
				include: PATHS.src,
				loader: "json-loader"
			} */