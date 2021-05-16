import Vue from 'vue'
import VueRouter from 'vue-router'

// import MSite from '../pages/msite/MSite'
// import Search from '../pages/search/Search'
// import Profile from '../pages/profile/Profile'
// import Order from '../pages/order/Order'

const MSite = () => import('../pages/msite/MSite')
const Search = () => import('../pages/search/Search')
const Profile = () => import('../pages/profile/Profile')
const Order = () => import('../pages/order/Order')

import Login from '../pages/login/Login'
import Shop from '../pages/shop/shop'
import ShopInfo from '../pages/shop/shop-info/ShopInfo'
import ShopRatings from '../pages/shop/shop-ratings/ShopRatings'
import ShopGoods from '../pages/shop/shop-goods/ShopGoods'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/msite',
      component: MSite, // MSite是返回路由组件的函数，只有执行此函数才会进行加载，这个函数在请求对应的路径时才会请求
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
