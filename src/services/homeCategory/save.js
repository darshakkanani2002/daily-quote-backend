const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const saveCat = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vName, vLanguageId, iAppType, iNumber, vIcon },
      file,
    } = entry;

    let filter = {
      isDeleted: false,
      vName,
      vLanguageId: new ObjectId(vLanguageId),
    };

    let checkData = await dbService.findOneRecord("homeCategoryModel", filter, {
      _id: 1,
    });
    if (checkData) throw new Error(Message.nameAlreadyExists);

    const saveData = await dbService.createOneRecord("homeCategoryModel", {
      vLanguageId,
      vName,
      iAppType,
      iNumber,
      vIcon,
      dtCreatedAt: Date.now(),
    });
    if (!saveData) throw new Error(Message.systemError);

    return saveData;
  } catch (error) {
    console.error("saveDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = saveCat;
