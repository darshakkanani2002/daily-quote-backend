const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");

const deleteCat = async (antry) => {
  try {
    let {
      body: { vCatId },
    } = antry;

    let condition = {
      _id: new ObjectId(vCatId),
      isDeleted: false,
    };

    let updateData = {
      isDeleted: true,
      isDeletedAt: Date.now(),
    };

    let deleteDrCat = await dbService.findOneAndUpdateRecord(
      "homeCategoryModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      },
      {
        isDeleted: 1,
        vIcon: 1,
      }
    );
    if (!deleteDrCat) throw new Error(Message.userNotFound);

    fs.unlink(`public/${deleteDrCat.vIcon}`, function (err) {
      //Do whatever else you need to do here
    });
    return deleteDrCat;
  } catch (error) {
    console.error("deleteCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteCat;
