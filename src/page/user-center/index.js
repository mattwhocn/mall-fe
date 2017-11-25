'use strict';

require('./index.scss');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.matt');
require('node_modules/_font-awesome@4.7.0@font-awesome/css/font-awesome.min.css');

var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        })
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo: function () {
        _user.getUserInfo(function(res) {
            var userHtml = _mm.renderHtml(templateIndex, res.data);
            $('.panel-body').html(userHtml)
        }, function(errMsg) {
            _mm.errorTips(errMsg)
        });
    }
};

$(function() {
    page.init();
});
