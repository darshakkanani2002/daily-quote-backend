const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");



const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      file,
    } = entry;
    let vImage = "";
    if (Object.keys(file).length) {
      vImage = "userImage/" + file.filename;
    }
    const saveData = await dbService.createOneRecord("CreatePostModel", {
      vUserId: userId,
      vImages: vImage,
      dtCreatedAt: Date.now(),
    });
    if (!saveData) throw new Error(Message.systemError);
    return saveData;
  } catch (error) {
    console.error("saveDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
