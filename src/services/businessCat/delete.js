const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

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

    let deleteCat = await dbService.findOneAndUpdateRecord(
      "BusinessCatModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      },
      {
        isDeleted: 1,
      }
    );
    if (!deleteCat) throw new Error(Message.userNotFound);
    return deleteCat;
  } catch (error) {
    console.error("deleteCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteCat;
