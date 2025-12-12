const mongoose=require("mongoose");
const Listing=require("../models/listings.js");
const initData=require("./data.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main().then(()=>{
    console.log("Connection successfull");
    
}).catch(()=>{
    console.log(e);
    
})

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
    
}

initDB();