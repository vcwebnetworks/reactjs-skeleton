const { addBabelPlugin, addWebpackPlugin, override } = require('customize-cra');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
  addBabelPlugin(['babel-plugin-root-import', { paths: [{ rootPathSuffix: 'src' }] }]),
  // isDevelopment && addWebpackPlugin(new ReactRefreshWebpackPlugin()),
];

module.exports = override(...plugins);
