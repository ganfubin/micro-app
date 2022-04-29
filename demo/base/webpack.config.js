const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  entry: {
    app: resolve('./src/main.tsx')
  },
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].[hash:5].chunk.js',
    chunkFilename: 'js/[name].[hash:5].chunk.js',
    publicPath: '/',
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
      title: 'base app',
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
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
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
    port: 8001,
    historyApiFallback: true,
  }
};