import Vue from 'vue'
import vuex from 'vuex'
import user from './modules/user'
import order_info from './modules/order_info'
import getters from './getters'
Vue.use(vuex)

export default new vuex.Store({
    modules:{
        user,
        order_info
    },
    getters
})