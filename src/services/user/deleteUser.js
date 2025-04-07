const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deleteUser = async (antry) => {
  try {
    let {
      user: { _id: userId },

      // body: { vUserId },
    } = antry;

    let condition = {
      _id: new ObjectId(userId),
      isDeleted: false,
    };

    let updateData = {
      isDeleted: true,
    };

    let userDelete = await dbService.findOneAndUpdateRecord(
      "UserModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      },
      {
        isDeleted: 1,
      }
    );
    if (!userDelete) throw new Error(Message.systemError);

    return userDelete
  } catch (error) {
    console.error("deleteUser ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteUser