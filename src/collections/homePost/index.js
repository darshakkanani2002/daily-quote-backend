const mongoose = require("mongoose");

const homePostSchema = new mongoose.Schema({
  vCatId: { type: mongoose.Schema.Types.ObjectId, ref: "vCatId" },
  vLanguageId: { type: mongoose.Schema.Types.ObjectId, ref: "vLanguageId" },
  vImages: { type: String },
  dtDate: { type: Number },
  iDownload: { type: Number, default: 0 },
  iLike: { type: Number, default: 0 },
  iShare: { type: Number, default: 0 },
  iBDownload: { type: Number, default: 0 },
  iBLike: { type: Number, default: 0 },
  iBShare: { type: Number, default: 0 },
  isTrending: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isTime: { type: Boolean, default: false },
  vBPostId: { type: mongoose.Schema.Types.ObjectId, ref: "vBPostId" },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblhomePost", homePostSchema);
