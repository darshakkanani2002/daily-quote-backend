const mongoose = require("mongoose");

const premiumDetailsSchema = new mongoose.Schema({
  vTitle: { type: String },
  isFestival: { type: Boolean, default: false },
  vFestivalImage: { type: String },
  vFestivalDiscount: { type: String },
  arrBenefits: [],
  arrPremium: [
    {
      vDay: { type: String },
      vPrice: { type: String },
      vDiscountPrice: { type: String },
    },
  ],
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblpremiumdetails", premiumDetailsSchema);
