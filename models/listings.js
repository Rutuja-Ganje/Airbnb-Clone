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
    image:
    
    {
        filename:{
        type:String,
        default:"listingimage"
    },
        url:{
            type:String,
            default:"https:images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60"
        }
        
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