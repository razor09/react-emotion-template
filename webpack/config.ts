import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import * as TerserWebpackPlugin from 'terser-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import 'webpack-dev-server';
import { Args } from './typings';

export default (_: object, args: Args): Configuration => {
  const isDevelopment = args.mode === 'development';
  const isProduction = args.mode === 'production';
  const isLocalEnvironment = args.name === 'local';
  return {
    entry: resolve('src/entry'),
    output: {
      path: resolve('dist'),
      publicPath: '/',
      filename: '[fullhash].js',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: isProduction
            ? [
                {
                  loader: 'babel-loader',
                  options: {
                    plugins: ['@emotion/babel-plugin'],
                  },
                },
                'ts-loader',
              ]
            : 'ts-loader',
        },
        {
          test: /\.ttf$/,
          type: 'asset/resource',
          generator: {
            filename: '[hash].[ext]',
          },
        },
      ],
    },
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
      host: 'localhost',
      port: 4200,
      historyApiFallback: true,
    },
    plugins: [
      new DefinePlugin({ isLocalEnvironment }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
      }),
    ],
  };
};
