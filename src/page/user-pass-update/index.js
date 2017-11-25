'use strict';

require('./index.scss');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        })
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo: function () {
        
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status) {
                // 更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res) {
                    _mm.successTip(res.msg);
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
        console.log(fromData)
        // 原密码是否为空
        if(!_mm.validata(fromData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result
        }
        if(!fromData.passwordNew || fromData.passwordNew.length < 6) {
            result.msg = '密码长度不得小于6位';
            return result
        }
        // 验证两次密码是佛一致
        if(fromData.passwordConfirm !== fromData.passwordNew) {
            result.msg = '两次密码不一致';
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
