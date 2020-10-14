// 引入formidable 模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');


module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件后缀
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // err 错误对象
        // fields 存储普通请求参数
        // files 存储上传的文件信息
        //res.send(files.cover.path.split('public')[1]);
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })

        // 文章插入成功后，重定向到列表页面
        res.redirect('/admin/article');

    });
    // res.send('ok');
}