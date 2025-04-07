const ObjectId = require("mongodb").ObjectId;
const Message = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const fs = require("fs");
const deleteImage = async (antry) => {
  try {
    let {
      body: { arrReelsId },
    } = antry;

    // let filter = {
    //   _id: new ObjectId(arrReelsId),
    //   isDeleted: false,
    // };

    // let background = await dbService.findOneRecord("ReelsModel", filter);

    // if (!background) throw new Error(Message.recordNotFound);

    for (const element of arrReelsId) {
      let condition = {
        _id: new ObjectId(element),
        isDeleted: false,
      };
      let updateData = { isDeleted: true };
      let reelsDelete = await dbService.findOneAndUpdateRecord(
        "ReelsModel",
        condition,
        updateData,
        {
          returnOriginal: false,
        }
      );

      if (!reelsDelete) throw new Error(Message.recordNotFound);

      fs.unlink(`public/${reelsDelete.vReels}`, function (err) {
        //Do whatever else you need to do here
      });
    }

    return {};
  } catch (error) {
    console.error("deleteReelsError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteImage;
