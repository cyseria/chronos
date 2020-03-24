module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    loaders: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader', // 将 JS 字符串生成为 style 节点
      'css-loader', // 将 CSS 转化成 CommonJS 模块
      {
        loader: 'sass-loader',
        options: {
          // Prefer `dart-sass`
          implementation: require('sass'),
        },
      },
    ]
  }
];
