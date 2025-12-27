const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
let port = 8080;
const methodOverride = require("method-override");
const listingSchema=require("./schema.js");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./view"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})
//Connection to the DB
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main().then(() => {
    console.log("Connection successfull");

}).catch(() => {
    console.log(e);

})

//home rote



const validateListing=(req,res,next)=>{
     let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

}

//Index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index.ejs", { allListings });

})
);

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listing/new.ejs");
});


//Show Route
app.get("/listings/:id",async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs", { listing })

}
);



//Create Route
app.post("/listings",validateListing, wrapAsync(async (err, req, res, next) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
})
);
//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs", { listing });
})
);
//Update Route
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
})
);
// Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
);
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode=500,message="something went wrong!" } = err;
    res.status(statusCode).render("error.ejs",{message});

})