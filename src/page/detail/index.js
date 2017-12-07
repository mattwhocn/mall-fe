'use strict';

require('./index.scss');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.matt');

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || '',
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function () {
        // 判断 没有 productId
        if(!this.data.productId) {
            _mm.goHome()
        } else {
            this.loadDeatil();
        }
    },
    bindEvent: function() {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                current = ~~$pCount.val(),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val(current < maxCount ? current + 1 : maxCount);
            }
            else if (type === 'minus') {
                $pCount.val(current > minCount ? current - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function() {
            console.log(_this.data.productId)
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) {
                console.log(res)
                window.location.href = './result.html?type=cart-add';
            }, function(errorMsg) {
                _mm.errorTips(errorMsg)
            })
        });
    },
    // 加载商品详情数据
    loadDeatil: function() {
        var html = '',
            _this = this,
            $pageWrap = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail地址
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res.data)
            // 缓存数据
            _this.data.detailInfo = res.data
            html = _mm.renderHtml(templateIndex, res.data)
            $pageWrap.html(html);
        }, function(errorMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        })
    },
    filter: function(data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function() {
    page.init();
})