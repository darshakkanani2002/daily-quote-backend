const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const moment = require("moment");

const premium = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vPaymentId,
        vAmount,
        vPaymentMethod,
        vPaymentDetails,
        iPremiumType,
      },
      file,
    } = entry;

    let currentDate = Date.parse(moment(new Date()).format("YYYY/MM/DD"));

    let endDate;
    if (iPremiumType == 0) {
      let startDate = new Date(currentDate);

      let futureDate = new Date(startDate);
      let getDate = futureDate.setDate(startDate.getDate() + 7);

      endDate = Date.parse(moment(getDate).format("YYYY/MM/DD"));
    }

    if (iPremiumType == 1) {
      let startDate = new Date(currentDate);

      let futureDate = new Date(startDate);
      let getDate = futureDate.setDate(startDate.getDate() + 30);

      endDate = Date.parse(moment(getDate).format("YYYY/MM/DD"));
    }
    if (iPremiumType == 2) {
      let startDate = new Date(currentDate);

      let futureDate = new Date(startDate);
      let getDate = futureDate.setDate(startDate.getDate() + 365);

      endDate = Date.parse(moment(getDate).format("YYYY/MM/DD"));
    }

    const userData = await dbService.createOneRecord("UserPremiumModel", {
      vUserId: userId,
      vPaymentId,
      vAmount,
      vPaymentMethod,
      vPaymentDetails,
      vStartDate: currentDate,
      vEndDate: endDate,
      iPremiumType,
      dtCreatedAt: Date.now(),
    });
    if (!userData) throw new Error(Message.systemError);

    // return userData;

    // ----------------------- premiumUpdate ------------------

    let condition = {
      _id: new ObjectId(userId),
      isDeleted: false,
    };
    let updatePremium = await dbService.findOneRecord("UserModel", condition, {
      _id: 1,
    });
    if (!updatePremium) throw new Error(Message.userNotFound);

    let updateData = {
      isPremium: true,
    };

    let updateUSer = await dbService.findOneAndUpdateRecord(
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

    if (!updateUSer) throw new Error(Message.systemError);
    return {};
  } catch (error) {
    console.error("onSignUpError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = premium;
