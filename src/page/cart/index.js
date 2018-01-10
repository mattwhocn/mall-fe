'use strict';

require('./index.scss');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.matt');

var page = {
    data: {
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function () {
        
    },
    bindEvent: function() {
        var _this = this;
        
    },
    // 加载数据
    loadCart: function() {
        
    },
    
};

$(function() {
    page.init();
})