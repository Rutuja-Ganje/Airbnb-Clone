const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Listing=require("./models/listings.js");
const ejsMate=require("ejs-mate");
let port=8080;
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./view"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    
})
//Connection to the DB
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main().then(()=>{
    console.log("Connection successfull");
    
}).catch(()=>{
    console.log(e);
    
})
//Index route
app.get("/listings",async(req,res)=>{
 const allListings=await Listing.find({});
   res.render("index.ejs",{allListings});    
   
})
//New Route
app.get("/listings/new",(req,res)=>{
    res.render("new.ejs");
})

//Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("show.ejs",{listing})
    
})
//Create Route
app.post("/listings",async(req,res)=>{
  let listing=new Listing(req.body.listing);
await listing.save();
res.redirect("/listings")
    
})
//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("edit.ejs",{listing});
})

//Update Route
app.put("/listings/:id",async(req,res)=>{
     let {id}=req.params;
  await  Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})

// Delete Route
app.delete("/listings/:id",async(req,res)=>{
     let {id}=req.params;
  await  Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


