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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStapUsername();
    },
    bindEvent: function () {
        var _this = this;
        // 输入用户名后的下一步按钮的点击
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            if(username) {
                _user.getQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res.data;
                    _this.loadStapQueston();
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            }
            // 没有输入用户名
            else {
                formError.show('请输入用户名')
            }
        })
        // 输入密码提示答案后的点击
        $('#submit-question').click(function() {
            var answer = $.trim($('#answer').val());
            // 密码提示答案存在
            if(answer) {
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res.data;
                    _this.loadStapPassword();
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            }
            // 没有密码提示问题答案
            else {
                formError.show('请输入密码提示问题答案')
            }
        })
        // 输入新密码后的点击提交
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            // 新密码存在
            if(password && password.length >=6 ) {
                _user.resetPassword({
                    username: _this.data.username,
                    forgetToken: _this.data.token,
                    passwordNew: password
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            }
            // 没有输入密码
            else {
                formError.show('请输入不少于6位的新密码')
            }
        })
    },
    // 加载输入用户名的一步
    loadStapUsername: function() {
        $('.stap-username').show()
    },
    // 加载输入密码提示问题答案的一步
    loadStapQueston: function() {
        // 清楚错误提示
        formError.hide()
        // 做容器的切换   
        $('.stap-username').hide()
            .siblings('.stap-question').show()
            .find('.question').text(this.data.question)
    },
    // 加载输入password的一步
    loadStapPassword: function() {
        // 清楚错误提示
        formError.hide()
        // 做容器的切换   
        $('.stap-question').hide()
            .siblings('.stap-password').show()
    },
};

$(function() {
    page.init();
});


