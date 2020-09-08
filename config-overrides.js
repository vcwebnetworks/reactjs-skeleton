const { addBabelPlugin, addWebpackPlugin, override } = require('customize-cra');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = override(
  addBabelPlugin(['babel-plugin-root-import', { paths: [{ rootPathSuffix: 'src' }] }]),
  addWebpackPlugin(new ReactRefreshWebpackPlugin())
);
