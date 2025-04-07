const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      body: { vCatId, vName, vIcon, iNumber },
      file,
    } = entry;

    let condition = {
      _id: new ObjectId(vCatId),
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord(
      "BusinessCatModel",
      condition,
      {
        _id: 1,
      }
    );
    if (!userData) throw new Error(Message.recordNotFound);

    let updateData = {
      vName,
      vIcon,
      iNumber,
      isUpdatedAt: Date.now(),
    };

    let updateDrCat = await dbService.findOneAndUpdateRecord(
      "BusinessCatModel",
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
