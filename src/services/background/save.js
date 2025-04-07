const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vImageName },
      files,
    } = entry;

    let saveData;
    files.forEach(async (element) => {
      let checkData = await dbService.findOneRecord(
        "BackgroundModel",
        { vImage: "background/" + element.filename },
        {
          _id: 1,
        }
      );

      if (!checkData) {
        saveData = await dbService.createOneRecord("BackgroundModel", {
          vImage: "background/" + element.filename,
        });
        if (!saveData) throw new Error(Message.systemError);
      }
    });

    return saveData;
  } catch (error) {
    console.error("saveDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
