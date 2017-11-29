'use strict';

require('./index.scss')
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./index.matt');
require('node_modules/_font-awesome@4.7.0@font-awesome/css/font-awesome.min.css');


$(function() {
    var bannerHtml = _mm.renderHtml(templateBanner)
    $('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({
        dots: true,
    });
    // 前一张和后一张的时间绑定
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prew') ? 'prev' : 'next';
        console.log(forward)
        $slider.data('unslider')[forward]();
    })
});