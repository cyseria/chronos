const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    reportFiles: ['src/**/*.{ts,tsx}'],
    // use false will fail the build process if there is any type error.
    async: true
  })
];
