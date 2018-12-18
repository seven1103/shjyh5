// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  { AlertPlugin,ConfirmPlugin,ToastPlugin  } from 'vux'
import store from '@/store'
import fn from '@/utils/function'
import * as filters from '@/utils/filter'
import Axios from 'axios'
import '@/permission'


Vue.prototype.$axios = Axios
//Axios.defaults.baseURL = '/api'
let href = window.location.href;
if(href.indexOf('https')>-1){
  //Axios.defaults.baseURL = '/local'
  Axios.defaults.baseURL = 'https://www.shoubei9.com'
}else{
  //Axios.defaults.baseURL = '/api'
  Axios.defaults.baseURL = 'http://www.shoubei9.com'
}

//Axios.defaults.baseURL = 'https://www.shoubei9.com'
Vue.config.productionTip = false
Vue.use(require('vue-cookies'))
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin, {position: 'default',type:'text',width:'2rem'})
/* eslint-disable no-new */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$fn = fn
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
