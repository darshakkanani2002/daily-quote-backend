const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const crypto = require("crypto");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vCatId,
        vLanguageId,
        isTrending,
        isTime,
        isPremium,
        dtDate,
        iAppType,
      },
      files,
    } = entry;

    let postArry = [];

    for (const element of files) {
      // const businessId = crypto.randomBytes(12).toString("hex");

      const saveData = await dbService.createOneRecord("HomePostModel", {
        vImages: "images/" + element.filename,
        vCatId,
        dtDate: dtDate ? Date.parse(dtDate) : 0,
        iAppType,
        isTime,
        isTrending,
        isPremium,
        vLanguageId,
        // vBPostId: businessId,
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
