const Listing = require("../models/listing");



module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
   };



module.exports.renderNewForm = (req, res) => {                              
    res.render("listings/new.ejs");
  };


module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {
     path: "author",
    },
   }).populate("owner");
    if(!listing) {
     req.flash("error", "Listing You Requested For Does Not Exist!");
     res.redirect("/listings");
    }
    console.log(listing);
    res.render("Listings/show.ejs", {listing});
  };



module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", "filename");

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save(); //Jaisai hi nya listing create hoga waisai hi hum chatai hai ki message pop up upar aaya ki new list create hogya hai uskai liyai hum karegai req.flash()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  
};


module.exports.renderEditForm = async (req, res) => {
     let {id} = req.params;
     const listing = await Listing.findById(id);
     if(!listing) {
      req.flash("error", "Listing You Requested For Does Not Exist!");
      res.redirect("/listings");
     }
     res.render("listings/edit.ejs", {listing});
   };



module.exports.updateListing = async (req, res) => {
  
    let {id} = req.params;
    
     //Extract Listing
     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});  //Deconstruct karkai parameter ko individual value mai convet kar rahai hai
     
     if(typeof req.file !== "undefined") {
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image = { url, filename };
     await listing.save();
     
     };

     req.flash("success", "Listing Updated Successfully!");
     res.redirect(`/listings/${id}`);
  
  
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
  }