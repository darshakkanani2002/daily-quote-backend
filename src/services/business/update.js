const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vBusinessId,
        vBusinessCatId,
        vName,
        vAddress,
        vMobile,
        vImage,
        vEmail,
        vWpNumber,
        vWebLink,
        vSocialId,
      },
      file,
    } = entry;

    let condition = {
      _id: new ObjectId(vBusinessId),
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord("BusinessModel", condition, {
      _id: 1,
    });
    if (!userData) throw new Error(Message.userNotFound);

    let updateData = {
      vName,
      vBusinessCatId,
      vAddress,
      vMobile,
      vImage,
      vEmail,
      vWpNumber,
      vWebLink,
      vSocialId,
      isUpdatedAt: Date.now(),
    };

    let updateDrCat = await dbService.findOneAndUpdateRecord(
      "BusinessModel",
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
