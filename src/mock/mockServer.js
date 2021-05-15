// 使用Mock.js提供mock数据接口

import Mock from 'mockjs'
import data from './data.json'

// returns goods interface
Mock.mock('/shop_goods', {code: 0, data: data.goods})

// returns ratings interface
Mock.mock('/shop_ratings', {code: 0, data: data.ratings})

// returns info interface
Mock.mock('/shop_info', {code: 0, data: data.info})
