import Vue from 'vue'
import vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
Vue.use(vuex)

export default new vuex.Store({
    modules:{
        user
    },
    getters
})