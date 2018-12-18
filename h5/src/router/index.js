import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../views/index'
import homedetail from '../views/homedetail'
import introduction from '../views/introdction'
import join from '../views/join/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/homedetail',
      name: 'homedetail',
      component: homedetail
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: introduction
    },
    {
      path: '/join',
      name: 'join',
      component: join
    }
  ]
})
