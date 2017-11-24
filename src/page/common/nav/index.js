'use strict';
require('./index.scss');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

// 导航
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCont();
        return this;    // this指向调用者nav，以支持链式操作 ，这时候模块输出的还是nav
    },
    bindEvent: function () {
        // 登录点击时间
        $('.js-login').click(function() {
            _mm.doLogin();
        })
        // 注册点击时间
        $('.js-register').click(function() {
            window.location.href = './user-register.html'
        })
        // 退出登录
        $('.js-logout').click(function() {
            console.log(111)
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _mm.errTips(errMsg)
            })
        })
    },
    // 加载用户信息
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.data.username);
        }, function(errMsg) {
            _mm.errTips(errMsg)
        })
    },
    // 加载购物车数量
    loadCartCont: function() {
        // _cart.getCartCount(function(res) {
        //     $('.nav .cart-count').text(res || 0);
        // }, function(errMsg) {
        //     $('.nav .cart-count').text(0);
        // })
    }
}
module.exports = nav.init();    // 在输出模块的时候就先调用一下
