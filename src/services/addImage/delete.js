const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deleteFrame = async (antry) => {
  try {
    let {
      body: { vFrameId },
    } = antry;

    let filter = {
      _id: new ObjectId(vFrameId),
      isDeleted: false,
    };

    let frame = await dbService.findOneRecord("FrameModel", filter);

    if (!frame) throw new Error(Message.recordNotFound);

    let condition = {
      _id: new ObjectId(vFrameId),
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
      "FrameModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!frameDelete) throw new Error(Message.recordNotFound);
    return {};
  } catch (error) {
    console.error("deleteFrameError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteFrame;
