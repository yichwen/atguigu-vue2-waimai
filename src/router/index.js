import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/msite/MSite'
import Search from '../pages/search/Search'
import Profile from '../pages/profile/Profile'
import Order from '../pages/order/Order'
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
      component: MSite,
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
