var _mm = require('util/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount: function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        })
    },

    // 添加到购物车
    addToCart: function (productInfo, resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // =======================================
    // 购物车列表
    getCartList: function (productInfo, resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/cart_list.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 添加购物车
    getCartList: function (productInfo, resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/cart_list.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 移除某个商品
    getCartList: function (productInfo, resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/cart_list.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 选中某个商品
    getCartList: function (productInfo, resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/cart_list.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 购物车取消选中
    getCartList: function (productInfo, resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/cart_list.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 购物车全选，取消全选
    getCartList: function (productInfo, resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/cart_list.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
}

module.exports = _cart;