import Vue from 'vue'
import Router from 'vue-router'
import home from '../view/home'
//import Layout from '@/view/my/Loyout'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path:'/my',
      //component: Layout,
      component: (resolve) => require(['@/view/my/Loyout'], resolve),
      redirect: '/my/order',
      children:[{
          path:'index',
          //component:()=> import('@/view/my/index'),
          component: (resolve) => require(['@/view/my/index'], resolve),
          name:'user',
          meta:{title:'我的个人中心'}
        },{
          path:'order',
          //component:()=> import('@/view/my/order'),
          component: (resolve) => require(['@/view/my/order'], resolve),
          name:'order',
          meta:{title:'我的订单'}
        },
        {
          path:'address',
          //component:()=> import('@/view/my/address'),
          component: (resolve) => require(['@/view/my/address'], resolve),
          name:'address',
          meta:{title:'我的地址'}
        },
        {
          path:'detail',
          //component:()=> import('@/view/my/orderdetail'),
          component: (resolve) => require(['@/view/my/orderdetail'], resolve),
          name:'detail',
          meta:{title:'我的订单详情'}
        }
      ]
    }
  ]
})
