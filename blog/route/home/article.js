// 引入文章集合构造函数
const { Article } = require('../../model/article');
// 引入评论集合构造函数
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    // res.send('欢迎来到博客文章详情页面');

    // 接收客户端传递过来的id值
    const id = req.query.id;
    // 根据id查询文章详细信息
    let article = await Article.findOne({ _id: id }).populate('author');
    article = JSON.parse(JSON.stringify(article));
    // 查询当前文章所对应的评论信息
    let comment = await Comment.find({ aid: id }).populate('uid');
    comment = JSON.parse(JSON.stringify(comment));
    // res.send(comment);
    // return;
    res.render('home/article.art', {
        article,
        comment
    });
}