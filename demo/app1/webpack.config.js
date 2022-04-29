const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  mode: 'development',
  entry: {
    app: resolve('./src/main.tsx')
  },
  output: {
    path: resolve('./dist'),
    filename: 'js/[name].[hash:5].chunk.js',
    chunkFilename: 'js/[name].[hash:5].chunk.js',
    library: 'app1-[name]',
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_app1-[name]`,
    globalObject: 'window'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      "@": resolve('./src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'svg icon',
      template: resolve('./index.html'),
      hash: true,
      inject: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              attributes: {
                name: `app1`
              },
            }
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader'
          }
        ]
      },
    ]
  },
  devServer: {
    port: 8002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
};