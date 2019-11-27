
// ref: https://umijs.org/config/
import { resolve } from 'path'
export default {
  base: '/admin/',
  publicPath: '/admin/',
  outputPath: './admin',
  treeShaking: true,
  history: 'browser',
  "exportStatic": {},//路由为静态页面
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        webpackChunkName: true
      },
      title: '九五三',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  chainWebpack(config, { webpack }) {
    // 设置 alias
    config.output.filename(`[name].${Date.now()}.js`).end();
  },
  alias: {
    api: resolve(__dirname, './src/services/')
  },
  mock: {
    //exclude: ['mock/**/*.js'],
  }, 
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
}
