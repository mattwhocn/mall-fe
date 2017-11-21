'use strict';
var Hogan = require('hogan');
var conf = {
    serverHost: ''
};
var _mm = {
    // 网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'GET',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                // 请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res)
                }
                // 没有登录状态，需要登录
                else if (res.status === 10) {
                    this.doLigin();
                }
                // 接口成功，请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.stautsText);
            }
        })
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam: function (name) {
        // happymall.com/product/list.do?keyword=xx x&page=1
        //keyword=xx x&page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html
    renderHtml : function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTip: function (msg) {
        alert(msg || '操作成功');
    },
    // 成功提示
    errorTip: function (msg) {
        alert(msg || '哪里不对了~');
    },
    // 字段的校验 支持是非空，手机，邮箱
    validate: function (value, type) {
        var value = $.trim(value);
        if (type === "require"){
            return !!value;
        }
        // 手机号码验证
        if (type === "phone"){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if (type === "email"){
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    // 调回主页
    goHome: function () {
        window.location.href = './index.html';
    },
    //
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;