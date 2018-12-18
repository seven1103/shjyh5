import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'
// import pay from '@/components/pay'
// import rush from '@/components/rush'
// import orders from '@/components/orders'
// import logistics from '@/components/logistics'
// import address from '@/components/address'
// import updateAddr from '@/components/update-addr'
// import getinfo from '@/components/getinfo'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/mobile/',
      name: 'index',
      component: (resolve) => require(['@/components/home'], resolve),
    },{
      path: '/mobile/getinfo',
      name: 'getinfo',
      component: (resolve) => require(['@/components/getinfo'], resolve)
    },{
      path: '/mobile/wxpay',
      name: 'pay',
      component: (resolve) => require(['@/components/pay'], resolve)
    },{
      path: '/mobile/orders',
      name: 'orders',
      component: (resolve) => require(['@/components/orders'], resolve)
    },{
      path: '/mobile/rush',
      name: 'rush',
      component: (resolve) => require(['@/components/rush'], resolve)
    },{
      path: '/mobile/logistics',
      name: 'logistics',
      component: (resolve) => require(['@/components/logistics'], resolve)
    },{
      path: '/mobile/address',
      name: 'address',
      component: (resolve) => require(['@/components/address'], resolve)
    },{
      path: '/mobile/updateAddr',
      name: 'updateAddr',
      component: (resolve) => require(['@/components/update-addr'], resolve)
    }
  ]
})
