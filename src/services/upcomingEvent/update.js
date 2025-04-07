const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {
    let {
      body: { vEventId, vName, dtDate, vLanguageId },
      file,
    } = antry;
    let filter = {
      _id: new ObjectId(vEventId),
    };
    let bannerCheck = await dbService.findOneRecord(
      "upcomingEventModel",
      filter,
      {
        _id: 1,
        vBannerImg: 1,
      }
    );
    if (!bannerCheck) throw new Error(Message.noDataAvailable);
    let bannerimage = "";
    if (Object.keys(file).length) {
      bannerimage = "upcomingEvent/" + file.filename;
    }
    let condition = {
      _id: new ObjectId(vEventId),
    };
    let updateData = {
      vName,
      vLanguageId: new ObjectId(vLanguageId),
      dtDate: Date.parse(dtDate),
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    let addbBanner = await dbService.findOneAndUpdateRecord(
      "upcomingEventModel",
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
