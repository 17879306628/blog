// 引用express框架
const express = require('express');
// 创建博客管理页面路由
const admin = express.Router();


// 管理员登录页面路由
admin.get('/login', require('./admin/loginPage'));



// 实现登录功能路由
admin.post('/login', require('./admin/login'));


// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 实现用户退出功能
admin.get('/logout', require('./admin/logout'));

// 创建新增用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 实现新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 实现用户修改信息功能
admin.post('/user-modify', require('./admin/user-modify'));

// 实现删除用户功能
admin.get('/delete', require('./admin/user-delete'));

// 文章列表页面路由
admin.get('/article', require('./admin/article'));
// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'));

// 实现文章修改功能的路由
admin.post('/article-modify', require('./admin/article-modify'));



// 将路由对象作为模块成员进行到处
module.exports = admin;