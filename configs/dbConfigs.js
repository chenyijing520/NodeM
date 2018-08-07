var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/PM',function(err){
    if(err){
        console.log('数据库链接失败');
    }else{
       console.log('数据链接成功');
    }


});
module.exports = mongoose;