import { getUmiConfig, resolveNocobasePackagesAlias } from '@nocobase/devtools/umiConfig';
import { defineConfig } from 'umi';

const packageJson = require('./package.json');
const umiConfig = getUmiConfig();

process.env.MFSU_AD = 'none';

export default defineConfig({
  hash: true,
  define: {
    'process.env.APP_ENV': process.env.APP_ENV,
    'process.env.VERSION': packageJson?.devDependencies?.['@nocobase/client'],
    ...umiConfig.define,
  },
  // only proxy when using `umi dev`
  // if the assets are built, will not proxy
  proxy: {
    ...umiConfig.proxy,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', exact: false, component: '@/pages/index' }],
  // fastRefresh: {},
  chainWebpack(config) {
    resolveNocobasePackagesAlias(config);
  },
});
