import router from '@/router'
import store from '@/store'
import cookies from 'vue-cookies'
import { UserInfo } from '@/api/index'

const whiteList = ['/home', '/my/index']
router.beforeEach((to, from, next) => { 
    // 判断当前用户是否存在缓存
    if(cookies.get('userid')){
        // 判断store
        if(!store.state.user.id){
            UserInfo({id:cookies.get('userid')}).then(user=>{
                if(user){
                    store.dispatch('GetUserInfo', user.result);
                    next()
                }else{
                    next(`/home?redirect=${to.path}`)
                }
            })
        }else{
            next()
        }
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next(`/home?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
})