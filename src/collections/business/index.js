const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  vUserId: { type: mongoose.Schema.Types.ObjectId, ref: "vUserId" },
  vBusinessCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vBusinessCatId",
  },
  vImage: { type: String },
  vName: { type: String },
  vAddress: { type: String },
  vMobile: { type: String },
  vEmail: { type: String },
  vWpNumber: { type: String },
  vWebLink: { type: String },
  vSocialId: { type: String },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblbusiness", businessSchema);
