const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");


const saveFrame = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { },
      file,
    } = entry;

  
    let vImage = "";
    if (Object.keys(file).length) {
      vImage = "images/" + file.filename;
    }


    return { vImage: vImage };
  } catch (error) {
    console.error("saveDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = saveFrame;
