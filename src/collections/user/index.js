const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  vName: { type: String },
  vMobile: { type: String },
  vEmail: { type: String },
  vImage: { type: String },
  vAddress: { type: String },
  vDesignation: { type: String },
  vLoginToken: { type: String },
  isDeleted: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  arrPostid: [{ type: mongoose.Schema.Types.ObjectId }],
  arrBPostid: [{ type: mongoose.Schema.Types.ObjectId }],
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tbluser", userSchema);
