const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const generateJwtTokenFn = require("../../utils/generateJwtTokenFn");
const decryptPassword = require("../../utils/decryptPassword");

const Login = async (entry, res) => {
  try {
    let {
      body: { vEmail, vName, vMobile, vImage },
    } = entry;
    // vPassword
    let condition = {
      vEmail,
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord("UserModel", condition);

    // if (!userData) throw new Error(Message.invalidCredentials);

    let user;
    if (userData) {
      let token = await generateJwtTokenFn({ userId: userData._id });

      let updateData = {
        vLoginToken: token,
        vLastLogin: Date.now(),
      };

      if (vName) {
        updateData["vName"] = vName;
      }

      if (vMobile) {
        updateData["vMobile"] = vMobile;
      }

      if (vImage) {
        updateData["vImage"] = vImage;
      }

      user = await dbService.findOneAndUpdateRecord(
        "UserModel",
        condition,
        updateData,
        {
          returnOriginal: false,
        }
      );
      if (!user) throw new Error(Message.systemError);
    } else {
      const userData = await dbService.createOneRecord("UserModel", {
        vName,
        vImage: vImage,
        vMobile,
        vEmail,
        dtCreatedAt: Date.now(),
      });
      if (!userData) throw new Error(Message.systemError);
      let token = await generateJwtTokenFn({ userId: userData._id });

      let updateData = { vLoginToken: token, vLastLogin: Date.now() };
      user = await dbService.findOneAndUpdateRecord(
        "UserModel",
        condition,
        updateData,
        {
          returnOriginal: false,
        }
      );
      if (!user) throw new Error(Message.systemError);
    }

    // let matchPassWord = await decryptPassword(vPassword, userData.vPassword)

    // if (!matchPassWord) throw new Error(Message.invalidCredentials);

    return user;
  } catch (error) {
    console.error("onLoginError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = Login;
