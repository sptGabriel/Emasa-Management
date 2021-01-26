module.exports = api => {
  // const babelEnv = api.env();
  // const plugins = [];
  // //change to 'production' to check if this is working in 'development' mode
  // if (babelEnv !== 'development') {
  //   plugins.push(['transform-remove-console']);
  // }
  // return {
  //   presets: ['react-app'],
  //   plugins,
  // };
};
//const babelEnv = api.env();
//const plugins = [];
////change to 'production' to check if this is working in 'development' mode
//if (babelEnv === 'development') {
//  plugins.push(['transform-remove-console']);
//}
//return {
//  presets: ['react-app'],
//  plugins,
//};
  // api.cache(true); // necessary
  // if (
  //   process.env.NODE_ENV !== 'production' ||
  //   process.env.BABEL_ENV !== 'production'
  // ) {
  //   return {
  //     "plugins": ['transform-remove-console'],
  //   };
  // }
// };
// module.exports = (api) => {
//   const babelEnv = api.env();
//   console.log(babelEnv, 'a')
//   const plugins = [
//     '@emotion/babel-plugin',
//     [
//       '@babel/plugin-proposal-decorators',
//       {
//         legacy: true,
//       },
//     ],
//     [
//       '@babel/plugin-proposal-class-properties',
//       {
//         loose: true,
//       },
//     ],
//   ];
//   //change to 'production' to check if this is working in 'development' mode
//   if (babelEnv === 'development') {
//     plugins.push(['transform-remove-console', {exclude: ['error', 'warn']}]);
//   }
//   return {
//     plugins,
//   };
// }
