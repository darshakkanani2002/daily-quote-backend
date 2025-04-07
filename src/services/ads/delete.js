const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deleteAds = async (antry) => {
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
      "CategoryModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      },
      {
        isDeleted: 1,
      }
    );
    if (!deleteDrCat) throw new Error(Message.userNotFound);
    return deleteDrCat;
  } catch (error) {
    console.error("deleteCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteAds;
