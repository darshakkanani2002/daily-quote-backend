const mongoose = require("mongoose");

const createchema = new mongoose.Schema({
  vImageName: { type: String },
  vUserId: { type: mongoose.Schema.Types.ObjectId, ref: "vUserId" },
  vImages: { type: String },
  iDownload: { type: Number, default: 0 },
  iLike: { type: Number, default: 0 },
  iShare: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblcreateposts", createchema);
