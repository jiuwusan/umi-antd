import request from '../utils/request'
import config from '../utils/config'
const { apiPrefix } = config;

/**
 * @param {请求方式，接口地址} params
 */
const gen = params => {
  let uri = params;
  let method = 'GET';

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    uri = paramsArray[1]
  }
  //得到正确的api地址
  let url = genApiUrl(uri);
  return function (data) {
    return request({
      uri,
      url,
      data,
      method,
    })
  }
}

const genApiUrl = uri => {
  if (uri) {
    if (uri.indexOf("http") > -1) {
      return uri;
    }
    if (apiPrefix == "/") {
      return uri;
    }
    return apiPrefix + uri;
  }
  return "";
}

const APIFunction = api => {
  const API = {}
  for (const key in api) {
    API[key] = gen(api[key])
  }
  return API;
}

export default APIFunction;