const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const apiTarget = process.env.API_TARGET;

module.exports = () => merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    historyApiFallback: true,
    port: 9000,
    open: true,
    ...(apiTarget ? {
  proxy: [
    {
      context: ['/rest.php', '/index.php', '/session.php', '/firms'],
      target: apiTarget,
      secure: false,
      changeOrigin: true,
    },
  ],
} : {}),
    client: {
      logging: 'verbose',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    server: {
      type: 'http',
      options: {
        ca: './cert/myCA.pem',
        key: './cert/localhost.key',
        cert: './cert/localhost.crt',
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      DEV_API_URL: JSON.stringify(apiTarget ? '/' : 'http://localhost/'),
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
});
