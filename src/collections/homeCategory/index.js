const mongoose = require("mongoose");

const homeCategorySchema = new mongoose.Schema({
  vLanguageId: { type: mongoose.Schema.Types.ObjectId, ref: "vLanguageId" },
  vName: { type: String },
  vIcon: { type: String },
  iAppType: { type: Number, default: 0 },
  iNumber: { type: Number, default: 2 },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblhomecategory", homeCategorySchema);
