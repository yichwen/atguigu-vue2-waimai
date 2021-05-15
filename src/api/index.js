// 包含n个请求接口函数的模块
import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

export const reqFoodTypes = () => ajax(`${BASE_URL}/index_category`)

export const reqShopList = (longtitude, latitude) => ajax(`${BASE_URL}/shops`, {longtitude, latitude})
