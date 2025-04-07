const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      body: { vLanguageId, vName, vCode },
    } = entry;

    let condition = {
      _id: new ObjectId(vLanguageId),
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord("LanguageModel", condition, {
      _id: 1,
    });
    if (!userData) throw new Error(Message.userNotFound);

    let updateData = {
      vName,
      vCode,
      isUpdatedAt: Date.now(),
    };

    let updateDrCat = await dbService.findOneAndUpdateRecord(
      "LanguageModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateDrCat) throw new Error(Message.systemError);
    return updateDrCat;
  } catch (error) {
    console.error("updateRole ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
