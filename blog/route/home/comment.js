// 将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // 接收客户端传递过来的评论信息
    const { content, uid, aid } = req.body;

    // 将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });
    // res.send(req.body);
    // 将页面重定向回文章详情页面
    res.redirect('/home/article?id=' + aid);
}