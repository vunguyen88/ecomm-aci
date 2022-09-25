const path = require('path');
const { config } = require('process');
//import config from 'react-reveal/globals';
// module.exports = {
//     sassOptions: {
//       includePaths: [path.join(__dirname, 'styles')],
//     },
//   }

  // const withCSS = require('@zeit/next-css')
  // module.exports = withCSS({
  //   cssLoaderOptions: {
  //     url: false
  //   }
  // });
//to detect and upload file-updates automatically 
// module.exports = {
//     webpackDevMiddleware: config => {
//         config.watchOptions.poll = 300; //every 300 ms
//         config({ ssrFadeout: true });
//         return config;
//     }
// };
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //console.log(config);
    config.module.rules.map((rule) => console.log('next config', JSON.stringify(rule)));
    return config;
  },
};
