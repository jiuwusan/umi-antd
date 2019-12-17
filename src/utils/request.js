import axios from 'axios'
import qs from 'qs';
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import router from 'umi/router';
import { notification } from 'antd';
import util from './util';
import config from './config';
import authutil from './authutil';
const { CancelToken } = axios;
window.cancelRequest = new Map();
//定义状态码
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export default function request(options) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)
  const original = url.replace(config.apiPrefix == "/" ? "" : config.apiPrefix, "");
  try {
    let domain = '';
    /**
     如下步骤解决动态路由参数
     接口地址 url = http://127.0.0.1:8000/platform/main/main/user/:id
     参数 data = {
      "id":"zkd",
      "name":"jws"
     }
     最终得到如下结果
     url = http://127.0.0.1:8000/platform/main/main/user/zkd
     data = {
      "name":"jws"
     }
     */
    //如下步骤解决动态路由参数
    //验证接口地址 (eg:http://127.0.0.1:8000/platform/main/main/user/:id)
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }
    //将链接中的 :id 提取出来
    const match = pathToRegexp.parse(url)
    //将链接中的参数替换为data里面的值，实现动态路由
    url = pathToRegexp.compile(url)(data)
    //删除参数data内重复字段
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    //得到新的接口地址
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url = url
  options.params = cloneData
  //截断post请求的params
  if (options.method == "POST") {
    options.params = {}
    //需要进行data格式化
    if (util.inStrArray(original, config.qsclude)) {
      options.data = qs.stringify(options.data);
    }
  }
  //用于取消请求
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  //文件下载
  if (url.includes('download')) {
    options.responseType = 'blob';
  }

  //文件上传
  if (url.includes('/upload')) {
    options.headers = {
      'Content-Type': 'multipart/form-data'
    };
    options.transformRequest = [function (data) {
      //重写上传参数
      let formData = new FormData();
      for (var key in options.data) {
        formData.append(key, options.data[key])
      }
      return formData
    }];
  }

  // console.log("axios请求", options);

  return axios(options)
    .then(response => {
      const { statusText, status, data, headers } = response;

      let result = {}
      if (typeof data === 'object') {

        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
        //表格导出 特定的返回
        if (String(data) === '[object Blob]') {
          result.data = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        headers: headers,
        ...result,
      })
    })
    .catch(error => {
      const { response, message } = error
      console.log("请求失败", error);
      if (String(message) === "cancel request") {
        return {
          success: false,
        }
      }

      let msg
      let statusCode
      let result = {}
      if (response && response instanceof Object) {
        const { data, statusText } = response
        result = data;
        statusCode = response.status
        msg = data.message || statusText
        //对返回status进行判断
        if (statusCode == 401) {
          notification.error({
            message: '未登录或登录已过期，请重新登录。',
          });
          //清空本地jwToen,和请求携带的token
          authutil.delToken();
        } else {
          notification.error({
            message: `请求错误 ${statusCode}: ${options.url}`,
            description: msg,
          });
        }
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
        notification.error({
          message: `Network Error`,
          description: '网络连接错误，请检查网络',
        });
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
        ...result,
      })
    })
}