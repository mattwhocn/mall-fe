'use strict';
require('./index.scss');
var _mm = require('util/mm.js');

// 通用页面头部
var header = {
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        var keyword = _mm.getUrlParam('keyword');
        console.log(keyword)
        // keyword存在则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function() {
        var _this = this
        // 点击搜索按钮以后做搜索提交
        $('#search-btn').click(function() {
            _this.searchSubmit();
        })
        // 输入回车后做搜索提交
        $('#search-input').keyup(function(e) {
            // 13是回车键的keycode
            if(e.keyCode === 13) {
                _this.searchSubmit();
            }
        })
    },
    // 搜索的提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        console.log(keyword)
        // 如果提交时输入框有keyword就跳转到列表页
        if(keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }
        // 如果keyword 为空，直接返回首页
        else {
            _mm.goHome();
        }
    }
}
header.init();    // 调用,不必输出
