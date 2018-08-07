// 引用模板
var multer=require('multer');
// 路径模块 系统模块
var path=require('path');
// 生成唯一随机数
var uid=require('uid');
// 引入格式化时间模块
var timestamp=require('time-stamp');

// 函数名称:imgUp;
// 功能:上传封面图片;
// 参数:imgPath 存放图片的文件夹;
//     imgType  存放合适的文件雷类型 例['image/jpeg','image/gif']
//     fileSize 文件上传大小限制


function imgUpload(imgPath,imgType,fileSize){
    // 图片基本配置
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          // 接受目录的文件夹
          cb(null, imgPath)
        },
        filename: function (req, file, cb) {
            // 接受后的文件名称 flie文件信息
            var extName=path.extname( file.originalname); 
            cb(null, timestamp()+'test'+uid(10)+ extName)
          }
    })
    // 过滤信息设置
     function  fileFilter(req,file,cb){
        //  判断图片格式是不是要求的
         if(imgType.indexOf(file.mimetype) == -1){
            //  拒绝这个文件
            cb(null, false);
            // 发送这样的一个错误
            cb(new Error('只允许上传 jpeg png gif 格式的图片'));
         }else{
            //  接受这个文件
            cb(null, true);
         }
     }
     var upload =multer({
        storage:storage,
        fileFilter:fileFilter,
        limits:{fileSize:fileSize},
     })

     return upload;
}
// 暴露上传图片函数
module.exports =imgUpload;


