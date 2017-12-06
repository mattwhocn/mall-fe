'use strict';

require('./index.scss');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _product = require('service/product-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.matt');
var Pagination = require('util/pagination/index.js');
require('node_modules/_font-awesome@4.7.0@font-awesome/css/font-awesome.min.css');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function () {
        this.loadList()
    },
    bindEvent: function() {
        var _this = this;
        $('.sort-item').click(function() {
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if($this.data('type') === 'default'){
                if ($this.hasClass('active')){
                    return 
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList: function() {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');

        // 删除不必要的字段
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求
        _product.getProductList(listParam, function(res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.data.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.data.hasPreviousPage,
                prePage: res.data.prePage,
                hasNextPage: res.data.hasNextPage,
                nextPage: res.data.nextPage,
                pageNum: res.data.pageNum,
                pages: res.data.pages
             });
        }, function(errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    // 加载分页信息
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render(
            $.extend( {}, pageInfo, {
                container: $('.pagination'),
                onSelectPage: function(pageNum) {
                    _this.data.listParam.pageNum = pageNum
                    _this.loadList();
                }
            })
        );
    }
};

$(function() {
    page.init();
})