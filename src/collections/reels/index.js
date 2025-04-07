const mongoose = require("mongoose");

const reelsSchema = new mongoose.Schema({
  vImageName: { type: String },
  vReels: { type: String },
  // isTrending: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblreels", reelsSchema);
