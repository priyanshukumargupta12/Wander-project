const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); //Yaha passportLocalMongoose ko plug in isiliyai add kara hai qki yai automatically username, hasshing salting ko add kar deta hai

module.exports = mongoose.model("User", userSchema);