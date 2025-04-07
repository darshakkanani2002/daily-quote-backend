const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const crypto = require("crypto");

const moment = require("moment");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vCatId, vLanguageId, isTrending, isTime, isPremium, iAppType },
      files,
    } = entry;

    let currentDate = Date.parse(moment(new Date()).format("YYYY/MM/DD"));
    let filter = {
      isDeleted: false,
      _id: new ObjectId(vCatId),
    };
    let catData = await dbService.findOneRecord("CategoryModel", filter, {
      _id: 1,
      iAppType: 1,
    });
    if (!catData) throw new Error(Message.recordNotFound);

    let postArry = [];

    for (const element of files) {
      // const businessId = crypto.randomBytes(12).toString("hex");

      const saveData = await dbService.createOneRecord("PostModel", {
        vImages: "images/" + element.filename,
        vCatId,
        isTime,
        isPremium,
        isTrending,
        vLanguageId,
        // vBPostId: businessId,
        dtDate: currentDate,
        iAppType: catData.iAppType,
        dtCreatedAt: Date.now(),
      });
      if (!saveData) throw new Error(Message.systemError);

      postArry.push(saveData);
    }
    return postArry;
  } catch (error) {
    console.error("saveDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
