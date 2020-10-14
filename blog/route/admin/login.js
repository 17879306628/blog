// 获取用户集合构造函数
const { User } = require('../../model/user');

// 导入bcrypt模块
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    // 接收请求参数
    const { email, password } = req.body;
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误,将于3秒后返回登录页面' });
    }
    // 根据邮箱地址，查询用户信息
    // 如果查询到用户邮箱地址，则user为一个对象，存储的是用户信息
    // 如果没有查询到邮箱地址，则user为空
    let user = await User.findOne({ email });
    // 查询到了用户
    if (user) {
        // 将客户端传递过来的密码和用户信息中的密码进行比对
        // true 比对成功
        // false 比对失败
        let isVaild = await bcrypt.compare(password, user.password);
        // 密码比对成功
        if (isVaild) {
            // 登录成功
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            // 将用户角色存储在session对象中
            req.session.role = user.role;
            // 登录成功跳转到用户列表页面
            // res.send('登入成功');
            // 让用户公共头部部分显示用户名
            req.app.locals.userInfo = user;
            // 对用户角色进行判断
            if (user.role == 'admin') {
                // 超级管理员
                // 使用重定向进入用户列表页面
                res.redirect('/admin/user');
            } else {
                // 普通用户
                // 跳转到博客首页
                res.redirect('/home/')
            }

        } else {
            // 密码比对失败
            res.status(400).render('admin/error', { msg: '邮件地址或者密码错误,将于3秒后返回登录页面' });
        }
    } else {
        // 没有查询用户
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误,将于3秒后返回登录页面' });
    }


}