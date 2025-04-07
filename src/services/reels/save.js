const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");



const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vImageName, },
      files,
    } = entry;





    let reelsArry = [];

    for (const element of files) {
      let saveData = await dbService.createOneRecord("ReelsModel", {
        vReels: "reels/" + element.filename
      });
      if (!saveData) throw new Error(Message.systemError);


      reelsArry.push(saveData)


    }

    return reelsArry;

  } catch (error) {
    console.error("saveReels ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
