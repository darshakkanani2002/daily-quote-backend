const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      body: { },
    } = entry;

    let filter = {
      isDeleted: false,
    };

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          Adstart: 1,
          GBanner: 1,
          GInter: 1,
          GNative: 1,
          GOpanApp: 1,
          GReward: 1,
          FBanner: 1,
          FInter: 1,
          FNative: 1,
          AdPlatform: 1,
          InterTime: 1,
          UpdateApp: 1,
          UnderWork: 1,
          AdxBanner: 1,
          AdxInter: 1,
          AdxNative: 1,
          AdxOpanApp: 1,
          AdxReward: 1,
          OtherLink: 1,
          FNativeBanner: 1,
          NativePosition: 1,
          PostLimit: 1
        },
      },
      { $sort: { _id: 1 } },
    ];

    let dataList = await dbService.aggregateData("AdsModel", aggregateQuery);
    let totalCount = await dbService.recordsCount("AdsModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};


module.exports = list
