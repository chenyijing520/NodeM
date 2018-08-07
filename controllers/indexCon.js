// 创建模块
var indexCon = {};
// 分类添加模板
var classModel = require('../model/classModel');
// 添加歌单模板
var articleModel = require('../model/articleModel');
var linkModel = require('../model/linkModel');
// 首页
indexCon.index=function(req,res){
    classModel.find().sort({order:1}).exec(function(err,data){
        if(err){
            console.log('查询失败');
        }else{
            // 回调函数
            getlist(0)
            function getlist(n){
               articleModel.find({classId:data[n]._id}).limit(3).exec(function(error,data1){
                    data[n].articleList=data1;
                    if(n<data.length-1 ){
                        getlist(++n)
                    }else{
                        linkModel.find(function(err,data2){
                            if(err){
                                console.log('链接失败')
                            }else{
                                res.render('index',{classlist:data,data2:data2})
                            }
                        })
                        
                    }
                })

            }
        }
    })
}
// 列表
indexCon.indexList=function(req,res){
    classModel.find({_id:req.params._id}).sort({order:1}).exec(function(err,data){
        // console.log(data[0]._id)
        if(err){
            console.log('华语失败');
            
        }else{
             articleModel.find({classId:data[0]._id},function(err,data1){
                 if(err){
                     console.log('华语列表失败')
                 }else{
                     console.log(data1)
                    res.render('indexList',{data1:data1})
                 }
             })
        }
    })
   
}
// 详情页
indexCon.indexsing=function(req,res){
    articleModel.find({_id:req.params._id},function(err,data){
        if(err){
            console.log('详情失败')
        }else{
            console.log(data)
           res.render('indexsing',{data:data})
        }
    })
}
// 暴露模块
module.exports = indexCon;
