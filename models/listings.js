const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
 title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    img:{
        type:String,
        default:"https://unsplash.com/photos/sunset-over-a-field-of-tall-grass-H03NctJ4z7A",
        set:(v)=> v===" "? "https://unsplash.com/photos/sunset-over-a-field-of-tall-grass-H03NctJ4z7A":v,
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;