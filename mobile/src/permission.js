import router from '@/router'
import cookies from 'vue-cookies'
import store from '@/store'
router.beforeEach((to, from, next) => { 
    if(cookies.get('userinfo')){
        if(!store.getters.userid) store.dispatch('GetUserInfo', cookies.get('userinfo'));
        if(to.path.indexOf('/mobile')===-1){
            next('/mobile'+to.path)
        }else next()
    }else{
        if(to.path=='/mobile'||to.path.indexOf('/mobile/getinfo')>-1) next()
        else next(`/mobile?redirect=${to.path}`) // 否则全部重定向到登录页
    }
    // if(to.path.indexOf('/mobile')===-1){
    //     next('/mobile'+to.path)
    // }else next()
})