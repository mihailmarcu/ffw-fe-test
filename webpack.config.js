const path = require('path');                                       // Webpack uses this to work with directories.
const webpack = require('webpack');                                 // Webpack is a static module bundler for modern JavaScript applications.
const HtmlWebpackPlugin = require('html-webpack-plugin');           // The plugin will generate an HTML5 file for us that includes all our webpack bundles in the body using script tags.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');     // A webpack plugin to remove our build folder(s) before building.
const CopyWebpackPlugin = require('copy-webpack-plugin');           // Copies individual files or entire directories, which already exist, to the build directory.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
const PreloadWebpackPlugin = require('preload-webpack-plugin');     // A webpack plugin for automatically wiring up asynchronous (and other types) of JavaScript chunks using <link rel='preload'>. This helps with lazy-loading.
const CssUrlRelativePlugin = require('css-url-relative-plugin');    // Webpack plugin to convert css url(...) to relative path (only support webpack 4).

const IS_DEV = process.env.NODE_ENV === 'dev';    // Declare const for dvelopment execution mode.
/**
 * This is main configuration object.
 * Here we write different options and tell Webpack what to do.
 */
const config = {
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things on final bundle.
  mode: IS_DEV ? 'development' : 'production',
  // This option controls if and how source maps are generated.
  devtool: IS_DEV ? 'eval' : 'source-map',
  // Path to our entry point. From this file Webpack will begin his work.
  entry: './app/scripts/index.js',
  // Path and filename of our result bundle.
  // Webpack will bundle all JavaScript into this file.
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // In this option we will say Webpack how exactly it should transform different types of files.
  module: {
    rules: [
      {
        test: /\.js$/,              // Test is a regular expression for file extension which we are going to transform.
        exclude: /node_modules/,    // Exclude is a regular expression that tells Webpack which path should be ignored when transforming modules. That means we won't transform imported vendor libraries from npm if we import them in the future.
        loader: 'babel-loader',     // Transform our modern JavaScript code to browser compatible JavaScript code before bundling it.
      },
      {
        // Apply rule for .scss files.
        test: /\.scss$/,    
        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others.
        use: [
          // After all CSS loaders we use plugin to do his work.
          // It gets all transformed CSS and extracts it into separate single bundled file.
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: IS_DEV,
            },
          },
          'css-loader?url=false',     // This loader resolves url() and @imports inside CSS.
          'sass-loader',    // First we transform SASS to standard CSS.
        ],
      },
      {
        // Apply rule for images.
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            // A loader which transforms files into base64 URIs.
            // url-loader works like file-loader, but can return a DataURL if the file is smaller than a byte limit.
            loader: 'url-loader',
            // In options we can set different things like format and directory to save.
            options: {
              limit: 8192,                // A Number or String specifying the maximum size of a file in bytes.
              name: '[name].[ext]',       // Output the images name and extension.
              fallback: 'file-loader',    // Specifies an alternative loader to use when a target file's size exceeds the limit set in the limit option.
              outputPath: 'images',       // Specify a filesystem path where the target file(s) will be placed.
            },
          },
          {
            // Image loader module for webpack.
            // Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin.
            loader: 'image-webpack-loader',
            options: {
              // Compress JPEG images.
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // Compress PNG images.
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              // Compress GIF images.
              gifsicle: {
                interlaced: false,
              },
              // Compress JPG & PNG images into WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        // Apply rule for fonts.
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          // The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',    // Output the fonts name and extension.
            outputPath: 'fonts'            // Specify a filesystem path where the target file(s) will be placed.
          }
        }
      },
      {
        test: /\.twig$/,
        use: {
          loader: 'twig-loader',
          options: {
              // See options section below
          },
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      /* Use when importing individual BS components */
      // '$': 'jquery/dist/jquery.slim.js',
      // 'jQuery': 'jquery/dist/jquery.slim.js',
      // 'Popper': 'popper.js/dist/umd/popper', /* required for tooltips */
      // 'Util': 'exports-loader?Util!bootstrap/js/dist/util'
    }),
    new CopyWebpackPlugin([
      { from: './app/images', to: 'images' },
      { from: './app/fonts', to: 'fonts' },
    ]),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new PreloadWebpackPlugin({
      include: 'initial',
    }),
    new CssUrlRelativePlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'app/twig/index.twig.js')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'app'),
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
    minimizer: [],
  },
};

if (!IS_DEV) {
  const TerserPlugin = require('terser-webpack-plugin');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

  config.optimization.minimizer.push(
    new TerserPlugin(),
    new OptimizeCSSAssetsPlugin({})
  );
}

module.exports = config;
