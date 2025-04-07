const ObjectId = require("mongodb").ObjectId;
const Message = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const fs = require('fs');
const deleteImage = async (antry) => {
  try {
    let {
      user: { _id: userId },
      body: { vImageId },
    } = antry;

    let filter = {
      _id: new ObjectId(vImageId),
      vUserId: new ObjectId(userId),
      isDeleted: false,
    };

    let frame = await dbService.findOneRecord("CreatePostModel", filter);

    // if (!frame) throw new Error(Message.recordNotFound);

    let condition = {
      _id: new ObjectId(vImageId),
      vUserId: new ObjectId(userId),
      isDeleted: false,
    };

    let updateData = { isDeleted: true };

    // if (vArrPosition) {
    //   let bannerarr = banner.arrBannerImg;

    //   let newArrBanner = bannerarr.splice(vArrPosition, 1);

    //   updateData["arrBannerImg"] = newArrBanner;
    // } else {
    //   updateData["isDeleted"] = true;
    // }

    let frameDelete = await dbService.findOneAndUpdateRecord(
      "CreatePostModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!frameDelete) throw new Error(Message.recordNotFound);

    fs.unlink(`public/${frameDelete.vImages}`, function (err) {
      //Do whatever else you need to do here
    });
    return {};
  } catch (error) {
    console.error("deleteFrameError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteImage;
