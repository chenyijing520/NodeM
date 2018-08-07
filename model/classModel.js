// 引入数据库配置模块
var mongoose=require('../configs/dbConfigs');
// 定义骨架
var classSchema = new mongoose.Schema({
    name: String,
    ctime:{
       type: Date,
       default:new Date(),
    } ,
    description:String,
    order:Number,

});
var classModel=mongoose.model('class',classSchema);
module.exports=classModel;




