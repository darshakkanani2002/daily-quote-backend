const ObjectId = require("mongodb").ObjectId;
const Message = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const fs = require("fs");
const deleteImage = async (antry) => {
  try {
    let {
      body: { vPremiumId },
    } = antry;

    let condition = {
      _id: new ObjectId(vPremiumId),
      isDeleted: false,
    };

    let updateData = { isDeleted: true };

    let premiumDetailsDelete = await dbService.findOneAndUpdateRecord(
      "PremiumDetailsModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!premiumDetailsDelete) throw new Error(Message.recordNotFound);

    fs.unlink(`public/${premiumDetailsDelete.vFestivalImage}`, function (err) {
      //Do whatever else you need to do here
    });
    return {};
  } catch (error) {
    console.error("deleteError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteImage;
