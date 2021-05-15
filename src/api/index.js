// 包含n个请求接口函数的模块
import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 获取食品分类列表
export const reqFoodTypes = () => ajax(`${BASE_URL}/index_category`)
// 根据经纬度获取商铺列表
export const reqShopList = (longtitude, latitude) => ajax(`${BASE_URL}/shops`, {longtitude, latitude})
// 根据经纬度和关键字获取商铺列表
export const reqSearchShopList = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, {geohash, keyword})
// 用户名密码登录
export const reqPasswordLogin = (name, password, captcha) => ajax(`${BASE_URL}/login_pwd`, {name, password, captcha}, 'POST')
// 发送短信验证码
export const reqSendCode = (phone) => ajax(`${BASE_URL}/sendcode`, {phone})
// 手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax(`${BASE_URL}/login_sms`, {phone, code}, 'POST')
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)
// 用户登出
export const reqLogout = () => ajax(`${BASE_URL}/logout`)

export const reqShopGoods = () => ajax('/shop_goods')
export const reqShopInfo = () => ajax('/shop_info')
export const reqShopRatings = () => ajax('/shop_ratings')
