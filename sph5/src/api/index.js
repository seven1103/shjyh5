import request from '@/utils/request'

// 获取首页数据
export function indexData(){
    return request({
        url:'/users/index',
        method:'get'
    })
}
// 查询当前库存
export function GoodStock(query){
    return request({
        url:'/users/goodstock/'+query.id,
        method:'get'
    })
}

// 生成未付款订单
export function AddOrder(query){
    return request({
        url:'/users/addorder',
        method:'post',
        data:query
    })
}
// 生成支付二维码
export function paycode(query){
    return request({
        url:'/oauth/order',
        method: 'get',
        params:query
    })
}
// 查询当前订单状态
export function OrderStatus(query){
    return request({
        url:'/users/orderstatus/'+query.id,
        method:'get'
    })
}
// 撤销当前支付订单
export function DefaultOrder(query){
    return request({
        url:'/oauth/defaultorder/'+query.id,
        method:'get'
    })
}
// 支付超时处理
export function OverOrder(query){
    return request({
        url:'/users/overorder',
        method:'get',
        params:query
    })
}
// 查看个人订单
export function UserOrder(query){
    return request({
        url:'/users/order/'+query.userid,
        method:'get',
        params:query
    })
}
// 删除个人订单
export function deleteUserOrder(query){
    return request({
        url:'/users/delorder',
        method:'get',
        params:query
    })
}
// 查看订单详情
export function orderdetail(query){
    return request({
        url:'/users/orderdetail/' + query.orderid,
        method:'get'
    })
}


// 获取用户个人信息
export function UserInfo(query){
    return request({
        url:'/users/user/'+query.id,
        method:'get'
    })
}

// 修改用户收货地址
export function modifyaddress(query){
    return request({
        url:'/users/address/',
        method:'post',
        data:query
    })
}