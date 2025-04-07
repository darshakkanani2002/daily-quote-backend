const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const { required } = require("joi");

const deleteFont = async (antry) => {
  try {
    let {
      body: { vFontId },
    } = antry;

    let filter = {
      _id: new ObjectId(vFontId),
      isDeleted: false,
    };

    let frame = await dbService.findOneRecord("FontModel", filter);

    if (!frame) throw new Error(Message.recordNotFound);

    let condition = {
      _id: new ObjectId(vFontId),
      isDeleted: false,
    };

    let updateData = { isDeleted: true };

    let frameDelete = await dbService.findOneAndUpdateRecord(
      "FontModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!frameDelete) throw new Error(Message.recordNotFound);

    fs.unlink(`public/${frameDelete.vFontUrl}`, function (err) {
      //Do whatever else you need to do here
    });

    return {};
  } catch (error) {
    console.error("deleteFrameError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteFont;
