const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {
    let {
      body: {
        vHomePostId,
        vCatId,
        vLanguageId,
        dtDate,
        isTrending,
        isPremium,
        isTime,
      },
    } = antry;

    let filter = {
      _id: new ObjectId(vHomePostId),
    };

    let FrameCheck = await dbService.findOneRecord(
      "BusinessCatPostModel",
      filter,
      {
        _id: 1,
      }
    );

    if (!FrameCheck) throw new Error(Message.recordNotFound);
    let condition = {
      _id: new ObjectId(vHomePostId),
    };

    let updateData = {
      vCatId,
      vLanguageId,
      dtDate,
      isTrending,
      isPremium,
      isTime,
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    let addbBanner = await dbService.findOneAndUpdateRecord(
      "BusinessCatPostModel",
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
