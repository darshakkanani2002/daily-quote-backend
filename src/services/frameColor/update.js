const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {
    let {
      body: { vColorId, arrColorsFrame, arrColorsBorder },
      file,
    } = antry;

    let filter = {
      _id: new ObjectId(vColorId),
    };

    let bannerCheck = await dbService.findOneRecord("FrameColorModel", filter, {
      _id: 1,
    });

    if (!bannerCheck) throw new Error(Message.noDataAvailable);
    let condition = {
      _id: new ObjectId(vColorId),
    };

    let updateData = {
      arrColorsBorder: arrColorsBorder,
      arrColorsFrame: arrColorsFrame,
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };

    let addbBanner = await dbService.findOneAndUpdateRecord(
      "FrameColorModel",
      condition,
      updateData
    );

    if (!addbBanner) throw new Error(Message.systemError);
    return {};
  } catch (error) {
    console.error("updateBannerError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
