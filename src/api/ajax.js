// ajax 请求函数模块
// 返回值promise
import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    // 成功调用resolve
    // 失败了调用reject
    let promise
    if (type === 'GET') {
      // 准备query数据
      let queryParams = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        queryParams += key + '=' + data[key] + '&'
      })
      if (queryParams !== '') {
        queryParams = queryParams.substring(0, queryParams.lastIndexOf('&'))
        url = url + '?' + queryParams
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      resolve(response.data)
    }).catch(function (err) {
      reject(err)
    })
  })
}
