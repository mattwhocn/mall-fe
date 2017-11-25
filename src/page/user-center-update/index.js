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
        this.bindEvent();
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
            _mm.errorTip(errMsg)
        });
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status) {
                _user.updateUserInfo(userInfo, function (res) {
                    _mm.successTip(res.msg);
                    window.location.href = './user-center.html'
                }, function (errMsg) {
                    _mm.errorTip(errMsg);
                });
            } else {
                _mm.errorTip(validateResult.msg)
            }
        })
    },
    validateForm: function(fromData) {
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validata(fromData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result
        }
        if(!_mm.validata(fromData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result
        }
        if(!_mm.validata(fromData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result
        }
        if(!_mm.validata(fromData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result
        }
        // 通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function() {
    page.init();
});
