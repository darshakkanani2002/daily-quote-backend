const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const encryptPassword = require("../../utils/encryptPassword");

const onSignUp = async (entry) => {
  try {
    let {
      body: {
        vName,
        vMobile,
        vEmail,
        vPassword,
      },
      file
    } = entry;


    let vImages = "";
    if (Object.keys(file).length) {
      vImages = "images/" + file.filename;
    }


    let filter = {
      isDeleted: false,
      vEmail,
    };



    let userCheck = await dbService.findOneRecord("UserModel", filter, {
      _id: 1,
    });
    if (userCheck) throw new Error(Message.emailAlreadyExists);


    let encryptNewPassword = await encryptPassword(vPassword);

    const userData = await dbService.createOneRecord("UserModel", {
      vName,
      vImage: vImages,
      vMobile,
      vEmail,
      vPassword: encryptNewPassword,
      dtCreatedAt: Date.now(),
    });
    if (!userData) throw new Error(Message.systemError);

    return userData;
  } catch (error) {
    console.error("onSignUpError ----------->", error);
    throw new Error(error?.message);
  }
};


module.exports = onSignUp