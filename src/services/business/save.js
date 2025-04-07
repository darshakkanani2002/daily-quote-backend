const ObjectId = require("mongodb").ObjectId;
const { ObjectID } = require("mongodb");
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vName,
        vBusinessCatId,
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

    let filter = {
      isDeleted: false,
      vUserId: new ObjectId(userId),
    };

    let checkData = await dbService.findOneRecord("BusinessModel", filter, {
      _id: 1,
    });
    if (checkData) {
      console.log("update record");

      let updateData = {
        vBusinessCatId,
        vName,
        vAddress,
        vMobile,
        vImage,
        vEmail,
        vWpNumber,
        vWebLink,
        vSocialId,
        isUpdatedAt: Date.now(),
      };

      let updateCat = await dbService.findOneAndUpdateRecord(
        "BusinessModel",
        filter,
        updateData,
        {
          returnOriginal: false,
        }
      );
      if (!updateCat) throw new Error(Message.systemError);

      return updateCat;
    } else {
      console.log("new record");

      const saveData = await dbService.createOneRecord("BusinessModel", {
        vUserId: userId,
        vBusinessCatId,
        vName,
        vAddress,
        vMobile,
        vImage,
        vEmail,
        vWpNumber,
        vWebLink,
        vSocialId,
        dtCreatedAt: Date.now(),
      });
      if (!saveData) throw new Error(Message.systemError);
      return saveData;
    }
  } catch (error) {
    console.error("save ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
