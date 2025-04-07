const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const updateUser = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vName, vMobile, vImage, vAddress, vDesignation },
      file,
    } = entry;

    let condition = {
      _id: new ObjectId(userId),
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord("UserModel", condition, {
      _id: 1,
      vImage: 1,
    });
    if (!userData) throw new Error(Message.userNotFound);

    let updateData = {
      vName,
      vMobile,
      vImage,
      vAddress,
      vDesignation,
    };

    let updateUSer = await dbService.findOneAndUpdateRecord(
      "UserModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateUSer) throw new Error(Message.systemError);
    return updateUSer;
  } catch (error) {
    console.error("userUpdate ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = updateUser;
