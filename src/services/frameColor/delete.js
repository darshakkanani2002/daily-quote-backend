const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");

const deleteFrameColor = async (antry) => {
  try {
    let {
      body: { vColorId },
    } = antry;

    // let filter = {
    //   _id: new ObjectId(vBannerId),
    //   isDeleted: false,
    // };

    // let banner = await dbService.findOneRecord("BannerModel", filter);

    // if (!banner) throw new Error(Message.recordNotFound);

    let condition = {
      _id: new ObjectId(vColorId),
      isDeleted: false,
    };
    let updateData = { isDeleted: true };
    let frameColorDelete = await dbService.findOneAndUpdateRecord(
      "FrameColorModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!frameColorDelete) throw new Error(Message.recordNotFound);

    // fs.unlink(`public/${daySpacialDelete.vBanner}`, function (err) {
    //   //Do whatever else you need to do here
    // });

    return {};
  } catch (error) {
    console.error("deleteError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteFrameColor;
