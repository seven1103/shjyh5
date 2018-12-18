import axios from 'axios'
import Vue from 'vue'
import { AlertModule,LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
let vm = new Vue()
let Tokens = {
    'X-Auth-Session-Id': '',
    'X-Auth-Sign': '',
    'safe_seed': ''
}
let herf = window.location.href,baseURL;
if(herf.indexOf('https')>-1){
    //baseURL = '/local'
    baseURL = 'https://www.shoubei9.com'
}else{
    //baseURL = '/api'
    baseURL = 'http://www.shoubei9.com'
}
const service = axios.create({
    baseURL: baseURL,
    //baseURL: 'https://www.shoubei9.com',
    timeout: 5000 // request timeout
})

service.interceptors.request.use(
    config => {
        if(config.url.indexOf('orderstatus')===-1){
            vm.$vux.loading.show({text:'正在加载'})
        }
        return config
    },
    error => {
        console.log(error) // for debug
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if(response.config.url.indexOf('orderstatus')===-1){
            vm.$vux.loading.hide()
        }
        return response.data
    },
    error => {
        vm.$vux.loading.hide()
        AlertModule.show({
            title: '返回错误',
            content: error.message,
            onShow () {
              //console.log('Module: I\'m showing')
            },
            onHide () {
              //console.log('Module: I\'m hiding now')
            }
        })
        return Promise.reject(error)
    }
)

export default service
