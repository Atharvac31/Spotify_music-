const mongoose=require('mongoose');

const Song=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    track:{
        type:String,
        required:true
    },
    artist:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
    }
});

const SongModel=mongoose.model("song",Song);

module.exports=SongModel;
   