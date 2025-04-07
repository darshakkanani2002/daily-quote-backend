const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      body: { vAdsId, Adstart, GBanner, GInter, GNative, GOpanApp, GReward, FBanner, FInter, FNative, FReward, AdPlatform, InterTime, UpdateApp, UnderWork, AdxBanner, AdxInter, AdxNative, AdxOpanApp, AdxReward, OtherLink, FNativeBanner,
        NativePosition,
        PostLimit },
    } = entry;

    let condition = {
      _id: new ObjectId(vAdsId),
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord("AdsModel", condition, {
      _id: 1,
    });
    if (!userData) throw new Error(Message.recordNotFound);

    let updateData = {
      Adstart, GBanner, GInter, GNative, GOpanApp, GReward, FBanner, FInter, FNative, FReward, AdPlatform, InterTime, UpdateApp, UnderWork, AdxBanner, AdxInter, AdxNative, AdxOpanApp, AdxReward, OtherLink, FNativeBanner,
      NativePosition,
      PostLimit,
      isUpdatedAt: Date.now(),
    };

    let updateDrCat = await dbService.findOneAndUpdateRecord(
      "AdsModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateDrCat) throw new Error(Message.systemError);
    return updateDrCat;
  } catch (error) {
    console.error("updateAds ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
