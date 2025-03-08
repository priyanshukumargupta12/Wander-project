const Listing = require("../models/listing");
const Review = require("../models/review");



module.exports.createReview = async(req, res) => {
    // console.log(req.params.id);
    Listing.findById(req.params.id);
   let listing = await Listing.findById(req.params.id);
   let newReview = new Review(req.body.review); //Review ko request body sai le rahai hai
   newReview.author = req.user._id;
   listing.reviews.push(newReview); //review array ko push kar rahai hai
   await newReview.save(); //Review ko database mai save kara rahai hai
   await listing.save(); //asyncronus function hai isiliyai await kar rahai hai or listing mai save kara rahai hai review ko
   req.flash("success", "New Review Created!");

   res.redirect(`/listings/${listing._id}`);

  };

  module.exports.destroyReview = async (req, res) => {
    let{ id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully!");

    res.redirect(`/listings/${id}`);

  };