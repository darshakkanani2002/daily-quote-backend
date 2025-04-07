const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema({
  vCatId: { type: mongoose.Schema.Types.ObjectId, ref: "vCatId" },
  vName: { type: String },
  vIcon: { type: String },
  iNumber: { type: Number, default: 2 },
  iAppType: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblbusinesssubcat", subCategoriesSchema);
