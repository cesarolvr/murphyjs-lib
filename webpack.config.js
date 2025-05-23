const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/core/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      name: 'murphy',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: path.resolve(__dirname, 'babel.librc')
          }
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'logo.png', to: 'logo.png' }
      ],
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  mode: 'production',
  optimization: {
    minimize: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
}; 