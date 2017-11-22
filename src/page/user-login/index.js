'use strict';

require('./login.scss');
require('page/common/nav-simple/index.js');
require('node_modules/_font-awesome@4.7.0@font-awesome/css/font-awesome.min.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.errmessage').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.errmessage').text('');
    }
}

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('#submit').click(function() {
            _this.submit();
        })
        // 回车键提交 13代表回车键
        $('.user-content').keyup(function(e) {
            if(e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 提价表单
    submit: function() {
        var fromData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        console.log(fromData)
        var validResult = this.formValidate(fromData);
        // 验证成功
        console.log(validResult)
        if(validResult.status) {
            _user.userLogin(fromData, function(res){
                console.log(res)
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                console.log(errMsg)
                formError.show(errMsg)
            })
        } 
        // 验证失败
        else {
            formError.show(validResult.msg);
        }
    },
    formValidate: function(fromData) {
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validata(fromData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result
        }
        if(!_mm.validata(fromData.password, 'require')) {
            result.msg = '密码不能为空';
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


