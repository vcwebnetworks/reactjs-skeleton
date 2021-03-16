const { addBabelPlugin, addWebpackPlugin, override } = require('customize-cra');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = override(
  isDevelopment && addWebpackPlugin(new ReactRefreshWebpackPlugin()),
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ]),
);
