import request from '../utils/request'
// import { apiPrefix } from 'utils/config'
const apiPrefix = "/api/v1";

/**
 * @param {请求方式，接口地址} params 
 */
const gen = params => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = api => {
  const API = {}
  for (const key in api) {
    API[key] = gen(api[key])
  }
  return API;
}

export default APIFunction;