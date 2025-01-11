const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    category: { type: String, required: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;