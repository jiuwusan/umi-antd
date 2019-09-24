import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import router from 'umi/router';
import { notification } from 'antd';
// axios.defaults.baseURL = "http://localhost:9531"
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

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url = url
  options.params = cloneData
  //用于取消请求
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })
  // console.log("axios请求",options);
  return axios(options)
    .then(response => {
      const { statusText, status, data } = response;
      const errortext = codeMessage[status] || statusText;
      //对返回status进行判断
      if (status == 401) {
        notification.error({
          message: '未登录或登录已过期，请重新登录。',
        });
        router.push("/auth/login");
        return;
      } else if (status != 200) {
        notification.error({
          message: `请求错误 ${status}: ${options.url}`,
          description: errortext,
        });
        // if (status === 403) {
        //   router.push('/exception/403');
        //   return;
        // }
        // if (status <= 504 && status >= 500) {
        //   router.push('/exception/500');
        //   return;
        // }
        // if (status >= 404 && status < 422) {
        //   router.push('/exception/404');
        //   return;
        // }
      }

      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
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

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}
