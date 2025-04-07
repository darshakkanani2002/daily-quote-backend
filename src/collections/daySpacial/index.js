const mongoose = require("mongoose");

const daySpacialSchema = new mongoose.Schema({
  vLanguageId: { type: mongoose.Schema.Types.ObjectId, ref: "vLanguageId" },
  vImages: { type: String },
  isDeleted: { type: Boolean, default: false },
  iDownload: { type: Number, default: 0 },
  iLike: { type: Number, default: 0 },
  iShare: { type: Number, default: 0 },
  // isTrending: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  vImageName: { type: String },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tbldayspacial", daySpacialSchema);
