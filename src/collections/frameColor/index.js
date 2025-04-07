const mongoose = require("mongoose");

const frameSchema = new mongoose.Schema({
  vLanguageId: { type: mongoose.Schema.Types.ObjectId, ref: "vLanguageId" },
  arrColorsFrame: [],
  arrColorsBorder: [],
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  vImageName: { type: String },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblframecolor", frameSchema);
