const ObjectId = require("mongodb").ObjectId;
const Message = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const fs = require("fs");
const deleteImage = async (antry) => {
  try {
    let {
      body: { arrBackgroundId },
    } = antry;

    for (const element of arrBackgroundId) {
      let condition = {
        _id: new ObjectId(element),
        isDeleted: false,
      };

      let updateData = { isDeleted: true };

      let backgroundDelete = await dbService.findOneAndUpdateRecord(
        "BackgroundModel",
        condition,
        updateData,
        {
          returnOriginal: false,
        }
      );

      if (!backgroundDelete) throw new Error(Message.recordNotFound);

      fs.unlink(`public/${backgroundDelete.vImage}`, function (err) {
        //Do whatever else you need to do here
      });
    }
    return {};
  } catch (error) {
    console.error("deleteFrameError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteImage;
