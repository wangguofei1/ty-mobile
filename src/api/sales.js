import request from '@/utils/request'

export function queryProvinceSalePriceRate(data) {
    return request({
        url: '/api/yearSales/queryProvinceSalePriceRate',
        method: 'post',
        data,
    })
}

export function queryRegionSale(data) {
    return request({
        url: `/api/yearSales/queryRegionSalePriceRate`,
        method: 'post',
        data,
    })
}
export function querySectionSale(data) {
    return request({
        url: `/api/yearSales/querySectionSalePriceRate`,
        method: 'post',
        data,
    })
}
export function queryArea(pId) {
  return request({
    url: `/api/admin/area/query`,
    method: 'get',
    params: { pId }
  })
}

export function queryShop(data) {
  return request({
    url: `/api/admin/shop/grid`,
    method: 'get',
    params: data
  })
}

export function submitTop(data) {
  return request({
    url: `/api/yearSales/querySalesInfo`,
    method: 'post',
    params: data
  })
}


export function queryShopSale(data) {
    return request({
        url: `/api/sale/shop/queryShopSaleAnalysis`,
        method: 'get',
        params:data,
    })
}

export function queryTree() {
  return request({
      url: `/api/admin/area/queryTree`,
      method: 'get',
  })
}