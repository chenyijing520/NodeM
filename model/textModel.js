var mongoose=require('../configs/dbConfigs');

    var textSchema = new mongoose.Schema({
        username: String,
        password:String,
        tel:Number,
        ctime:{
           type: Date,
           default:new Date(),
        } ,
        

    });
    var textModel=mongoose.model('text',textSchema);
   module.exports=textModel;
