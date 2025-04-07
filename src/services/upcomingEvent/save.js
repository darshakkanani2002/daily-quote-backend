const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (antry) => {
  try {
    let {
      body: { vLanguageId, vName, dtDate },
      file,
    } = antry;
    

    let daySpacialArry = [];

    let saveData = await dbService.createOneRecord("upcomingEventModel", {
      vName,
      dtDate: Date.parse(dtDate),
      vImages: "upcomingEvent/" + file.filename,
      vLanguageId,
    });
    if (!saveData) throw new Error(Message.systemError);

    daySpacialArry.push(saveData);
    return daySpacialArry;
  } catch (error) {
    console.error("addBannerError ----------->", error);
    throw new Error(error?.message);
  }

  // 9978812580
};

module.exports = save;
