'use strict';

require('./index.scss');
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
        // 验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            // 如果用户名为空就不做验证
            if (!username) {return};
            console.log($(this).val())
            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res) {
                formError.hide()
            }, function(errMsg) {
                formError.show(errMsg)
            })
        })
        // 注册按钮的点击
        $('#submit').click(function() {
            _this.submit();
        })
        // 回车键提交注册 13代表回车键
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
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#passwordConfirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        console.log(fromData)
        var validResult = this.formValidate(fromData);
        // 验证成功
        console.log(validResult)
        if(validResult.status) {
            _user.register(fromData, function(res){
                console.log(res)
                window.location.href = './result.html?type=register';
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
        if(fromData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result
        }
        if(fromData.password !== fromData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result
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


