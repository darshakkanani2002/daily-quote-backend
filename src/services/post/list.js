const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vCatId, vTime, vLanguageId, iPage, iLimit, iAppType, vPostId },
    } = entry;

    console.log("iAppType->", iAppType);
    console.log("iLimit->", iLimit);
    // return "";
    let filter = {
      isDeleted: false,
      isTime: false,
    };

    if (vCatId) {
      filter["vCatId"] = new ObjectId(vCatId);
      if (vPostId) {
        filter["_id"] = new ObjectId(vPostId);
      }

      let aggregateQuery = [
        {
          $match: filter,
        },

        {
          $lookup: {
            from: "tblusers",
            localField: "_id",
            foreignField: "arrPostid",
            let: { user: userId },
            pipeline: [
              { $match: { _id: new ObjectId(userId) } },
              { $project: { _id: 1 } },
            ],
            as: "like",
          },
        },

        {
          $lookup: {
            from: "tblusers",
            localField: "_id",
            foreignField: "arrBPostid",
            let: { user: userId },
            pipeline: [
              { $match: { _id: new ObjectId(userId) } },
              { $project: { _id: 1 } },
            ],
            as: "Blike",
          },
        },

        {
          $project: {
            _id: 1,
            vImageName: 1,
            vImages: 1,
            vLanguageId: 1,
            vBPostId: { $ifNull: ["$vBPostId", ""] },
            vCatId: 1,
            isPremium: 1,
            isTime: 1,
            isTrending: 1,
            dtCreatedAt: 1,
            iDownload: { $ifNull: ["$iDownload", 0] },
            iShare: { $ifNull: ["$iShare", 0] },
            iLike: { $ifNull: ["$iLike", 0] },
            iBDownload: { $ifNull: ["$iBDownload", 0] },
            iBShare: { $ifNull: ["$iBShare", 0] },
            iBLike: { $ifNull: ["$iBLike", 0] },
            isLike: {
              $cond: {
                if: { $eq: [{ $size: "$like" }, 0] },
                then: false,
                else: true,
              },
            },
            isBLike: {
              $cond: {
                if: { $eq: [{ $size: "$Blike" }, 0] },
                then: false,
                else: true,
              },
            },
          },
        },
        { $sort: { _id: -1 } },
        { $skip: (iPage - 1) * iLimit },
        { $limit: iLimit },
      ];

      let dataList = await dbService.aggregateData("PostModel", aggregateQuery);
      let totalCount = await dbService.recordsCount("PostModel", filter);
      if (!dataList) throw new Error(Message.systemError);
      return { data: dataList, iCount: totalCount };
    }

    if (vLanguageId) {
      let filter1 = {
        isDeleted: false,
        vLanguageId: new ObjectId(vLanguageId),
        isTime: false,
        $or: [{ iAppType: 0 }, { iAppType: 1 }],
      };

      if (vPostId) {
        filter1["_id"] = new ObjectId(vPostId);
      }
      let aggregateQuery = [
        {
          $match: filter1,
        },
        {
          $lookup: {
            from: "tblusers",
            localField: "_id",
            foreignField: "arrPostid",
            let: { user: userId },
            pipeline: [
              { $match: { _id: new ObjectId(userId) } },
              { $project: { _id: 1 } },
            ],
            as: "like",
          },
        },
        {
          $lookup: {
            from: "tblusers",
            localField: "_id",
            foreignField: "arrBPostid",
            let: { user: userId },
            pipeline: [
              { $match: { _id: new ObjectId(userId) } },
              { $project: { _id: 1 } },
            ],
            as: "Blike",
          },
        },
        {
          $project: {
            _id: 1,
            vImageName: 1,
            vImages: 1,
            isPremium: 1,
            isTime: 1,
            isTrending: 1,
            vLanguageId: 1,
            vBPostId: { $ifNull: ["$vBPostId", ""] },
            vCatId: 1,
            dtCreatedAt: 1,
            iDownload: { $ifNull: ["$iDownload", 0] },
            iShare: { $ifNull: ["$iShare", 0] },
            iLike: { $ifNull: ["$iLike", 0] },
            iBDownload: { $ifNull: ["$iBDownload", 0] },
            iBShare: { $ifNull: ["$iBShare", 0] },
            iBLike: { $ifNull: ["$iBLike", 0] },
            isLike: {
              $cond: {
                if: { $eq: [{ $size: "$like" }, 0] },
                then: false,
                else: true,
              },
            },
            isBLike: {
              $cond: {
                if: { $eq: [{ $size: "$Blike" }, 0] },
                then: false,
                else: true,
              },
            },
          },
        },
        { $sort: { _id: -1 } },
        { $skip: (iPage - 1) * iLimit },
        { $limit: iLimit },
      ];

      let dataList = await dbService.aggregateData("PostModel", aggregateQuery);
      let totalCount = await dbService.recordsCount("PostModel", filter1);
      if (!dataList) throw new Error(Message.systemError);
      return { data: dataList, iCount: totalCount };
    }
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
