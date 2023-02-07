const path = require('path');

const rootConfig = {
  mode: 'development',
  optimization: {
    usedExports: true, // tells webpack to tree-shake
  },
  devtool: 'eval-source-map',
  module:{
    rules:[
        {
            test:/\.css$/i,
            use:["style-loader","css-loader"],
        },
        {
            test:/\.(png|svg|jpg|jpeg|gif|webp)$/i,
            type:"asset/resource",
        },
    ],
  },
};

const appConfig = {
  ...rootConfig,
  entry: './src/lib.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

// const serviceWorkerConfig = {
//   ...rootConfig,
//   entry: './src/firebase-messaging-sw.js',
//   // TODO(jhuleatt): Remove this once https://github.com/firebase/firebase-js-sdk/issues/5314 is resolved
//   module: {
//     rules: [
//       {
//         test: /\.m?js/,
//         resolve: {
//           fullySpecified: false,
//         },
//       },
//     ],
//   },
//   output: {
//     filename: 'firebase-messaging-sw.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };

module.exports = [appConfig /*, serviceWorkerConfig*/];
