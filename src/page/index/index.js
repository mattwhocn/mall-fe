'use strict';

require('./index.scss')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
require('node_modules/_font-awesome@4.7.0@font-awesome/css/font-awesome.min.css');

navSide.init({
    name: 'user-center'
})