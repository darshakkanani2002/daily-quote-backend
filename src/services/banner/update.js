const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require('fs');
const update = async (antry) => {
  try {
    let {
      body: { vBannerId, vImageName },
      file,
    } = antry;

    // const bannerImage = await imageUpload(file);
    let filter = {
      _id: new ObjectId(vBannerId),
    };

    let bannerCheck = await dbService.findOneRecord("BannerModel", filter, {
      _id: 1,
      vBannerImg: 1,
    });

    if (!bannerCheck) throw new Error(Message.noDataAvailable);
    let bannerimage = "";
    if (Object.keys(file).length) {
      bannerimage = "images/" + file.filename;
    }

    let condition = {
      _id: new ObjectId(vBannerId),
    };

    let updateData = {
      vBannerImg: bannerimage,
      vImageName,
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    let addbBanner = await dbService.findOneAndUpdateRecord(
      "BannerModel",
      condition,
      updateData,
    );


   let newString = addbBanner.vBannerImg.replace("images/", "");
     console.log(newString);

    fs.unlinkSync("public/images/"+newString);
    console.log('File is deleted.');

    if (!addbBanner) throw new Error(Message.systemError);
    return {};
  } catch (error) {
    console.error("updateBannerError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
