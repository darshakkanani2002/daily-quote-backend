const mongoose = require("mongoose");

const userPremiumSchema = new mongoose.Schema({
  vUserId: { type: mongoose.Schema.Types.ObjectId, ref: "vUserId" },
  vPaymentId: { type: String },
  vAmount: { type: String },
  vPaymentMethod: { type: String },
  vPaymentDetails: { type: String },
  vStartDate: { type: Number },
  iPremiumType: { type: Number },
  vEndDate: { type: Number },
  vLoginToken: { type: String },
  isDeleted: { type: Boolean, default: false },
  isExpire: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblpremiumuser", userPremiumSchema);
