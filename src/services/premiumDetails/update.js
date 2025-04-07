const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {
    let {
      body: {
        vPremiumId,
        vTitle,
        isFestival,
        vFestivalImage,
        vFestivalDiscount,
        arrBenefits,
        arrPremium,
      },
    } = antry;

    let filter = {
      _id: new ObjectId(vPremiumId),
    };

    let FrameCheck = await dbService.findOneRecord(
      "PremiumDetailsModel",
      filter,
      {
        _id: 1,
      }
    );

    if (!FrameCheck) throw new Error(Message.noDataAvailable);

    let condition = {
      _id: new ObjectId(vPremiumId),
    };

    let updateData = {
      vTitle,
      isFestival,
      vFestivalDiscount,
      arrBenefits,
      arrPremium,
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    if (file.filename && Object.keys(file).length > 0) {
      let images = "images/" + file.filename;

      updateData[vFestivalImage] = images;
    }

    let addbBanner = await dbService.findOneAndUpdateRecord(
      "PremiumDetailsModel",
      condition,
      updateData
    );

    if (!addbBanner) throw new Error(Message.systemError);
    return addbBanner;
  } catch (error) {
    console.error("updateError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
