
// ref: https://umijs.org/config/
import { resolve } from 'path'
export default {
  treeShaking: true,
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
  //代理接口地址
  proxy: {
    "/api/v1": {
      "target": "http://127.0.0.1:9531",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1": "" },
      "secure": false, // 不进行证书验证
    }
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
