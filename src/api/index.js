import axios from 'axios'
import qs from 'qs'
import baseInfo from '../config/index.js'
import router from '../router'
import {
  Message,
  MessageBox
} from 'element-ui'

let root = '/api'
/*
  接口处理函数
  method : 接口方式 GET POST PUT DELETE
  path: 方法的相对路径
  params: 参数
  success: 成功回调函数
  failure: 失败回调函数
  @author 陈学
  @date 2019-06-24 14:05
*/

function apiAxios (method, path, params, success, failure) {
  axios({
    method: method,
    url: baseInfo.baseInfo.baseUrl + '/' + path,
    baseURL: root,
    data: qs.stringify(params),
    params: qs.stringify(params),
    withCredentials: true, // 允许服务器使用cookies
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => {
      let status = res.status
      let returnFlag = res.data.code
      if (Object.is(status, 200)) {
        if (returnFlag === 0) {
          // 请求成功
          success(res.data)
        } else if (returnFlag === 2) {
          MessageBox.confirm(
            '登录信息失效,请重新登录!',
            '确定登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            router.push({path: '/'})
          })
        } else if (returnFlag === 4) {
          MessageBox.confirm(
            '没有权限!',
            '温馨提示', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            router.push({path: '/'})
          })
        } else {
          if (failure) {
            // 请求失败
            failure(res.data)
          }
        }
      } else if (Object.is(status, 404)) {
        // 处理404问题 路径不对
      } else if (Object.is(status, 405)) {
        // 处理404问题 路径不对
        router.push({path: '/'})
      } else if (Object.is(status, 501)) {
        // 处理501问题 服务器问题
      }
    })
    .catch((err) => {
      // 网络或者其他问题
      Message({
        message: err.message,
        type: 'error',
        duration: 5 * 1000
      })
    })
}
function uploadImg (method, path, params, success, failure) {
  axios({
    method: method,
    url: baseInfo.baseInfo.baseUrl + '/' + path,
    baseURL: root,
    data: params,
    params: qs.stringify(params),
    withCredentials: true, // 允许服务器使用cookies
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(function (res) {
      let status = res.status
      let returnFlag = res.data.code
      if (Object.is(status, 200)) {
        if (returnFlag === 0) {
          // 请求成功
          success(res.data)
        } else if (returnFlag === 2) {
          MessageBox.confirm(
            '登录信息失效,请重新登录!',
            '确定登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            router.push({path: '/'})
          })
        } else {
          // 请求失败
          failure(res.data)
        }
      } else if (Object.is(status, 404)) {
        // 处理404问题 路径不对
      } else if (Object.is(status, 501)) {
        // 处理501问题 服务器问题
      }
    })
    .catch(() => {
      // 网络或者其他问题
      Message({
        message: '网络繁忙,请稍后重试...',
        type: 'error',
        duration: 5 * 1000
      })
    })
}
// 返回在vue模板中的调用接口
export default {
  get: function (path, params, success, failure) {
    return apiAxios('GET', path, params, success, failure)
  },
  post: function (path, params, success, failure) {
    return apiAxios('POST', path, params, success, failure)
  },
  put: function (path, params, success, failure) {
    return apiAxios('PUT', path, params, success, failure)
  },
  delete: function (path, params, success, failure) {
    return apiAxios('DELETE', path, params, success, failure)
  },
  uploadImg: function (path, params, success, failure) {
    return uploadImg('POST', path, params, success, failure)
  }
}
