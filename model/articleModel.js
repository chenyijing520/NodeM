// 引入数据库配置模块
var mongoose=require('../configs/dbConfigs');
// 定义骨架
var articleSchema = new mongoose.Schema({
     // 关联栏目
     classId:{
        type: 'ObjectId',
        // 关联集合
        ref:'class',
    },
    // 歌曲名称
    name: String,
    // 时间
    ctime:{
       type: Date,
       default:new Date(),
    } ,
    // 歌词
    content:String,
    // 演唱者
    sing:String,
// 作曲
    compose:String,
    // 封面
    imgurl:String,

});


var articleModel=mongoose.model('article',articleSchema);
module.exports=articleModel;

