const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const withoutLoginlist = async (entry) => {
  try {
    let {
      // user: { _id: userId },
      body: { vHomePostId, vCatId, vLanguageId, iPage, iLimit },
    } = entry;

    // return "";
    let filter = {
      isDeleted: false,
      isTime: false,
      vLanguageId: new ObjectId(vLanguageId),
      vCatId: new ObjectId(vCatId),
    };

    if (vHomePostId) {
      filter["_id"] = new ObjectId(vHomePostId);
    }
    let aggregateQuery = [
      {
        $match: filter,
      },

      {
        $project: {
          _id: 1,
          vImageName: 1,
          vImages: 1,
          isPremium: 1,
          vLanguageId: 1,
          isTrending: 1,
          vBPostId: { $ifNull: ["$vBPostId", ""] },
          isPremium: 1,
          dtCreatedAt: 1,
          vTextColor: 1,
          iDownload: { $ifNull: ["$iDownload", 0] },
          iShare: { $ifNull: ["$iShare", 0] },
          iLike: { $ifNull: ["$iLike", 0] },
          iBDownload: { $ifNull: ["$iBDownload", 0] },
          iBShare: { $ifNull: ["$iBShare", 0] },
          iBLike: { $ifNull: ["$iBLike", 0] },
          isLike: { $ifNull: ["$isLike", false] },
          isBLike: { $ifNull: ["$isBLike", false] },
        },
      },
      { $sort: { _id: -1 } },
      { $skip: (iPage - 1) * iLimit },
      { $limit: iLimit },
    ];

    let dataList = await dbService.aggregateData(
      "HomePostModel",
      aggregateQuery
    );
    let totalCount = await dbService.recordsCount("HomePostModel", filter);
    if (!dataList) throw new Error(Message.systemError);
    return { data: dataList, iCount: totalCount };
    // return dataList;
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = withoutLoginlist;
