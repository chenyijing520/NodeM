var express = require('express');
var router = express.Router();


// 引入adminCon控制器

var adminCon=require('../controllers/adminCon');

// 后台首页
router.get('/', adminCon.index);
// 响应分类页面
router.get('/classAdd',adminCon.classAdd)
// 分类添加
router.post('/classInsert',adminCon.classInsert);
// 查看分类
router.get('/classList',adminCon.classList);
// 删除分类
router.get('/classDel/:_id',adminCon.classDel);
// 查看一个分类
router.get('/classEdit/:_id',adminCon.clasEdit);
// 更新分类
router.post('/classUp',adminCon.classUp);
// 响应添加歌单
router.get('/articleAdd',adminCon.articleAdd);
// 添加歌单
router.post('/articleInsert',adminCon.articleInsert);
// 查看歌单分类
router.get('/articleList',adminCon.articleList);
// 删除歌单
router.get('/articleDel/:_id',adminCon.articleDel);
// 查看一条歌单数据
router.get('/articleEdit/:_id',adminCon.articleEdit);
// 更新歌单数据
router.post('/articleUp',adminCon.articleUp);
// 查看一条歌单的封面
router.get('/imgEdit/:_id',adminCon.imgEdit);
// 跟新封面
router.post('/imgUp',adminCon.imgUp);
// 管理员登陆
router.get('/login',adminCon.login);
// 验证码
router.get('/code',adminCon.code);
// 登陆
router.post('/doLogin',adminCon.doLogin);
// 退出登陆
router.get('/logout',adminCon.logout);
// 友情链接
router.get('/linkAdd',adminCon.linkAdd);
// 添加友情链接
router.post('/linkInsert',adminCon.linkInsert);
// 查看友情链接
router.get('/linkList',adminCon.linkList);
// 查看一条友情链接
router.get('/linkEdit/:_id',adminCon.linkEdit);
// 更新链接
router.post('/linkUp',adminCon.linkUp);
// 删除链接
router.get('/linkDel/:_id',adminCon.linkDel);
module.exports = router;
