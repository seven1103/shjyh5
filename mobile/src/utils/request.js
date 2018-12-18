import request from '../service'

let Tokens = {
    'X-Auth-Session-Id': '',
    'X-Auth-Sign': '',
    'safe_seed': ''
}
// post请求
export const axiosPostRequest = function (params, url) {
  return new Promise((resolve, reject) => {
    request.post(url, params)
    .then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}
// get请求
export const axiosGetRequest = function (params, url) {
  return new Promise((resolve, reject) => {
    request.get(url, params)
    .then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}
