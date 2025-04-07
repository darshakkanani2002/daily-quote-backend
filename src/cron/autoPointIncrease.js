const dbService = require("../utils/dbService");
// const sendNotificationByTopic = require("../services/notification/save");
const Message = require("../utils/messages");
const fs = require("fs");

const moment = require("moment");
const AutoIncreasePointCronService = async () => {
  let currentDate = Date.parse(moment(new Date()).format("YYYY/MM/DD"));
  const deteleDate = new Date(); // This is a valid Date object
  const pastDate = new Date(deteleDate); // Clone the current Date object
  pastDate.setDate(deteleDate.getDate() - 10); // Subtract 10 day

  let matchDate = Date.parse(moment(pastDate).format("YYYY/MM/DD"));

  // ----------------------   HomePost Delete  --------------------

  let deleteHomePostCondition = {
    isTime: false,
    isDeleted: false,
    // dtDate: matchDate,
    $or: [{ dtDate: matchDate }, { dtDate: { $lt: matchDate } }],
  };

  let deleteHomePostupdate = {
    isDeleted: true,
  };
  let deleteHomePost = await dbService.updateManyRecords(
    "HomePostModel",
    deleteHomePostCondition,
    deleteHomePostupdate,
    {
      returnOriginal: false,
    }
  );
  if (!deleteHomePost) throw new Error(Message.systemError);

  fs.unlink(`public/${deleteHomePost.vImages}`, function (err) {});

  // -------------------------Upcoming Event Post------------------------
  let deleteUpcomingCondition = {
    isDeleted: false,
    dtDate: { $lt: currentDate },
  };

  let deleteUpcomingupdate = {
    isDeleted: true,
  };
  let deleteupcomminPost = await dbService.updateManyRecords(
    "upcomingEventModel",
    deleteUpcomingCondition,
    deleteUpcomingupdate,
    {
      returnOriginal: false,
    }
  );
  fs.unlink(`public/${deleteupcomminPost.vImages}`, function (err) {});

  // <----------------- Post  Show Condition- --------------->

  let postcondition = {
    isTime: true,
    isDeleted: false,
  };

  let postupdateData = {
    isTime: false,
    dtDate: currentDate,
  };
  let post = await dbService.updateManyRecords(
    "PostModel",
    postcondition,
    postupdateData,
    {
      returnOriginal: false,
    }
  );
  if (!post) throw new Error(Message.systemError);

  // <----------------- Home Post Show Condition- --------------->

  let homePostcondition = {
    isTime: true,
    isDeleted: false,
    dtDate: currentDate,
  };

  let HomePostupdateData = {
    isTime: false,
  };
  let homePost = await dbService.updateManyRecords(
    "HomePostModel",
    homePostcondition,
    HomePostupdateData,
    {
      returnOriginal: false,
    }
  );
  if (!homePost) throw new Error(Message.systemError);

  // ------------------------------------premium update ------------------------------

  let condition = {
    vEndDate: currentDate,
    $or: [{ vEndDate: currentDate }, { vEndDate: { $lt: currentDate } }],
    isDeleted: false,
    isExpire: false,
  };

  let updateData = {
    isExpire: true,
  };

  let updatePremium = await dbService.updateManyRecords(
    "UserPremiumModel",
    condition,
    updateData,
    {
      returnOriginal: false,
    }
  );

  if (!updatePremium) throw new Error(Message.systemError);

  // ------------------------------------premium expire user   ------------------------------

  let filterGetExpireUser = {
    isDeleted: false,
    isExpire: false,
  };
  let getExpireUser = await dbService.findAllRecords(
    "UserPremiumModel",
    filterGetExpireUser,
    {
      _id: 1,
      vUserId: 1,
    }
    // {
    //   iNumber: 1,
    //   _id: 1,
    //   vUserId: 1,
    // }
  );

  console.log("getExpire User ----------.", getExpireUser);

  if (getExpireUser.length != 0) {
    let ids = getExpireUser.map((item) => item.vUserId);

    console.log("ids----------->", ids);

    let premiumUsercondition = {
      _id: { $nin: ids },
      isDeleted: false,
    };

    let updatePremiumUserData = {
      $set: { isPremium: false },
    };

    let updateUserPremium = await dbService.updateManyRecords(
      "UserModel",
      premiumUsercondition,
      updatePremiumUserData,
      {
        returnOriginal: false,
      }
    );
    if (!updateUserPremium) throw new Error(Message.systemError);

    console.log("updateUserPremium ---------->", updateUserPremium);
  } else {
    let premiumUsercondition = {
      isDeleted: false,
      isPremium: true,
    };

    let updatePremiumUserData = {
      $set: { isPremium: false },
    };

    let updateUserPremium = await dbService.updateManyRecords(
      "UserModel",
      premiumUsercondition,
      updatePremiumUserData,
      {
        returnOriginal: false,
      }
    );
    if (!updateUserPremium) throw new Error(Message.systemError);

    console.log("updateUserPremium ---------->", updateUserPremium);
  }

  return {};
};

module.exports = AutoIncreasePointCronService;
