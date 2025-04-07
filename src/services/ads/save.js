const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");


const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        Adstart,
        GBanner,
        GInter,
        GNative,
        GOpanApp,
        GReward,
        FBanner,
        FInter,
        FNative,
        FReward,
        AdPlatform,
        InterTime,
        UpdateApp,
        UnderWork,
        AdxBanner,
        AdxInter,
        AdxNative,
        AdxOpanApp,
        AdxReward,
        OtherLink,
        FNativeBanner,
        NativePosition,
        PostLimit,
      },
    } = entry;

    const saveData = await dbService.createOneRecord("AdsModel", {
      Adstart,
      GBanner,
      GInter,
      GNative,
      GOpanApp,
      GReward,
      FBanner,
      FInter,
      FNative,
      FReward,
      AdPlatform,
      InterTime,
      UpdateApp,
      UnderWork,
      AdxBanner,
      AdxInter,
      AdxNative,
      AdxOpanApp,
      AdxReward,
      OtherLink,
      FNativeBanner,
      NativePosition,
      PostLimit,
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
