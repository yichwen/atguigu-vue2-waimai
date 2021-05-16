import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPLIST,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOP
} from './mutation-types'

import {
  reqAddress,
  reqFoodTypes,
  reqLogout,
  reqShopList,
  reqUserInfo,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShopList
} from '../api'

export default {

  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longtitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  async getFoodTypes ({commit}) {
    const result = await reqFoodTypes()
    if (result.code === 0) {
      const foodTypes = result.data
      commit(RECEIVE_FOODTYPES, {foodTypes})
    }
  },

  async getShopList ({commit, state}) {
    const result = await reqShopList(state.longtitude, state.latitude)
    if (result.code === 0) {
      const shopList = result.data
      commit(RECEIVE_SHOPLIST, {shopList})
    }
  },

  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },

  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },

  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USERINFO)
    }
  },

  async getShopGoods ({commit}, cb) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新后执行回调函数
      cb && cb()
    }
  },

  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  async getShopRatings ({commit}, cb) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
       // 数据更新后执行回调函数
       cb && cb()
    }
  },

  updateFoodCount ({commit}, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  clearCart ({commit}) {
    commit(CLEAR_CART)
  },

  async searchShop ({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longtitude
    const result = await reqSearchShopList(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOP, {searchShops})
    }
  }

}
