const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (antry) => {
  try {
    let {
      body: { vImageName },
      file,
    } = antry;

    console.log(file);

    let bannerimage = "";
    if (Object.keys(file).length) {
      bannerimage = "images/" + file.filename;
    }

    let addbBanner = await dbService.createOneRecord("BannerModel", {
      vBannerImg: bannerimage,
      vImageName,
      dtCreatedAt: Date.now(),
    });

    if (!addbBanner) throw new Error(Message.systemError);
    return addbBanner;
  } catch (error) {
    console.error("addBannerError ----------->", error);
    throw new Error(error?.message);
  }

  // 9978812580
};

module.exports = save;
