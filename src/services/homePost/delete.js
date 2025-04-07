const ObjectId = require("mongodb").ObjectId;
const Message = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const fs = require("fs");
const deleteImage = async (antry) => {
  try {
    let {
      body: { arrImageId },
    } = antry;

    for (const element of arrImageId) {
      let condition = {
        _id: new ObjectId(element),
        isDeleted: false,
      };

      let updateData = { isDeleted: true };

      let frameDelete = await dbService.findOneAndUpdateRecord(
        "HomePostModel",
        condition,
        updateData,
        {
          returnOriginal: false,
        }
      );

      if (!frameDelete) throw new Error(Message.recordNotFound);

      fs.unlink(`public/${frameDelete.vImages}`, function (err) {
      });
    }
    return {};
  } catch (error) {
    console.error("deletePostError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteImage;
