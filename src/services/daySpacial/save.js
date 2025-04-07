const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (antry) => {
  try {
    let {
      body: { vLanguageId },
      files,
    } = antry;

    // let bannerimage = "";
    // if (files.length) {
    //   bannerimage = "images/" + files.filename;
    // }

    let daySpacialArry = [];

    for (const element of files) {
      let saveData = await dbService.createOneRecord("daySpacialModel", {
        vImages: "daySpacial/" + element.filename,
        vLanguageId,
      });
      if (!saveData) throw new Error(Message.systemError);

      daySpacialArry.push(saveData);
    }
    return daySpacialArry;
  } catch (error) {
    console.error("addBannerError ----------->", error);
    throw new Error(error?.message);
  }

  // 9978812580
};

module.exports = save;
