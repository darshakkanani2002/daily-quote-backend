const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
// import { imageUpload } from "../../utils/imageUpload";

const update = async (entry) => {
  try {
    let {
      body: { vSubCatId, vCatId, vName, vIcon },
      file,
    } = entry;
    let condition = {
      _id: new ObjectId(vSubCatId),
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord(
      "BusinessSubCatModel",
      condition,
      {
        _id: 1,
      }
    );
    if (!userData) throw new Error(Message.userNotFound);

    let updateData = {
      vName,
      vCatId,
      vIcon,
      isUpdatedAt: Date.now(),
    };

    let updateDrCat = await dbService.findOneAndUpdateRecord(
      "BusinessSubCatModel",
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
