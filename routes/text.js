var express = require('express');
var router = express.Router();
var textModel=require('../model/textModel');
var md5=require('md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('text/index');
});
// 添加管理员页面
router.get('/textAdd',function(req,res){
 res.render('text/textAdd');
})
// 添加管理员
router.post('/textInsert',function(req,res){
    var username=req.body.username.trim();
    var password = md5(req.body.password.trim());
   var userdata={
       username:username,
       password:password,
       tel:req.body.tel      

   }
    textModel.create(userdata,function(err){
        if(err){
        console.log('添加失败')
   }else{
    res.redirect('/text/textAdd');
   }
 })
})

module.exports = router;
