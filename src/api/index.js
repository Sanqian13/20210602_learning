/**
 * 包含接口
 */
import ajax from './ajax'
const BASE_URL = '/api'
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')
export const reqShops = (longitude, latitude) => ajax(`${BASE_URL}/shops`)
