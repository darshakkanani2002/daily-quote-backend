const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {
    let {
      body: { vFrameId, vFrameName },
      files,
    } = antry;

    let filter = {
      _id: new ObjectId(vFrameId),
    };

    let FrameCheck = await dbService.findOneRecord("FrameModel", filter, {
      _id: 1,
      // vBannerImg: 1,
    });

    if (!FrameCheck) throw new Error(Message.noDataAvailable);

    let thumbImage = "";
    let originalImage = "";
    if (Object.keys(files).length) {
      if (files.vThumbImage && Object.keys(files.vThumbImage[0]).length > 0) {
        thumbImage = "images/" + files.vThumbImage[0].filename;
      }
      if (
        files.vOriginalImage &&
        Object.keys(files.vOriginalImage[0]).length > 0
      ) {
        originalImage = "images/" + files.vOriginalImage[0].filename;
      }
    }

    let condition = {
      _id: new ObjectId(vFrameId),
    };

    let updateData = {
      vThumbImage: thumbImage,
      vOriginalImage: originalImage,
      vFrameName,
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    let addbBanner = await dbService.findOneAndUpdateRecord(
      "FrameModel",
      condition,
      updateData
    );

    let thumb = addbBanner.vThumbImage.replace("images/", "");
    let original = addbBanner.vOriginalImage.replace("images/", "");

    fs.unlinkSync("public/images/" + thumb);


    fs.unlinkSync("public/images/" + original);
   

    if (!addbBanner) throw new Error(Message.systemError);
    return {};
  } catch (error) {
    console.error("updateBannerError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
