const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {
    let {
      body: { vDaySpecialId, vLanguageId },
      file,
    } = antry;

    let filter = {
      _id: new ObjectId(vDaySpecialId),
    };

    let bannerCheck = await dbService.findOneRecord("daySpacialModel", filter, {
      _id: 1,
      vBannerImg: 1,
    });

    if (!bannerCheck) throw new Error(Message.noDataAvailable);
    let bannerimage = "";
    if (Object.keys(file).length) {
      bannerimage = "daySpacial/" + file.filename;
    }

    let condition = {
      _id: new ObjectId(vBannerId),
    };

    let updateData = {
      vLanguageId: new ObjectId(vLanguageId),
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    let addbBanner = await dbService.findOneAndUpdateRecord(
      "daySpacialModel",
      condition,
      updateData
    );

    let newString = addbBanner.vBannerImg.replace("images/", "");

    fs.unlinkSync("public/daySpacial/" + newString);

    if (!addbBanner) throw new Error(Message.systemError);
    return {};
  } catch (error) {
    console.error("updateBannerError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
