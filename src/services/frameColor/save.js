const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (antry) => {
  try {
    let {
      body: { arrColorsFrame, arrColorsBorder },
    } = antry;

    let saveData = await dbService.createOneRecord("FrameColorModel", {
      arrColorsFrame,
      arrColorsBorder,
    });
    if (!saveData) throw new Error(Message.systemError);

    return saveData;
  } catch (error) {
    console.error("addError ----------->", error);
    throw new Error(error?.message);
  }

  // 9978812580
};

module.exports = save;
