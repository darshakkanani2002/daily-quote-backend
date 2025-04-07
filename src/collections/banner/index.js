const mongoose = require("mongoose");


const bannerSchema = new mongoose.Schema({
  vBannerImg: { type: String },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  vImageName: { type: String },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblbanner", bannerSchema);
