// 导入分页模块
const pagination = require('mongoose-sex-page');

// 引入文章集合构造函数
const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    // res.send('这是博客首页');
    // 从数据库中查询数据
    let page = req.query.page;

    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    result = JSON.parse(JSON.stringify(result));
    // res.send(result);
    // return;
    // 渲染模板并查询数据
    res.render('home/default.art', {
        result: result
    });
}