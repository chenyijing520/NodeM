var mongoose=require('../configs/dbConfigs');

    var linkSchema = new mongoose.Schema({
        name: String,
        ctime:{
           type: Date,
           default:new Date(),
        } ,
        description:String,
        order:Number,

    });
    var linkModel=mongoose.model('link',linkSchema);
   module.exports=linkModel;

