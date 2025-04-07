const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {
    let {
      body: { vPostId, vLanguageId, vCatId, isTrending, isPremium, isTime },
    } = antry;

    let filter = {
      _id: new ObjectId(vPostId),
    };

    let FrameCheck = await dbService.findOneRecord("PostModel", filter, {
      _id: 1,
    });

    if (!FrameCheck) throw new Error(Message.recordNotFound);

    let condition = {
      _id: new ObjectId(vPostId),
    };

    let updateData = {
      vCatId,
      vLanguageId,
      isTrending,
      isPremium,
      isTime,
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    let addbBanner = await dbService.findOneAndUpdateRecord(
      "PostModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!addbBanner) throw new Error(Message.systemError);
    return addbBanner;
  } catch (error) {
    console.error("update ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
