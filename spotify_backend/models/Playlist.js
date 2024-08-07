const mongoose=require('mongoose');

const Playlist=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
  
    owner:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"user"
    },
    songs:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"song",
    }],
    collaborators:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
});

const PlaylistModel=mongoose.model("Playlist",Playlist);

module.exports=PlaylistModel;
   