const mongoose = require("mongoose");

const upcamingEventSchema = new mongoose.Schema({
  vLanguageId: { type: mongoose.Schema.Types.ObjectId, ref: "vLanguageId" },
  vImages: { type: String },
  dtDate: { type: Number },
  vName: { type: String },
  isDeleted: { type: Boolean, default: false },
  // isTrending: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  vImageName: { type: String },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblupcomingEvent", upcamingEventSchema);
