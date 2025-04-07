const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const allCatDataList = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vCatId, vLanguageId, iPage, iLimit },
    } = entry;

    let filterCatId = {
      isDeleted: false,
      vUserId: new ObjectId(userId),
    };
    let getCatId = await dbService.findOneRecord(
      "BusinessModel",
      filterCatId,
      {
        vBusinessCatId: 1,
      },
      {
        iNumber: 1,
        _id: 1,
        vBusinessCatId: 1,
      }
    );
    // if (!getCatId) throw new Error(Message.recordNotFound);

    let filtersubCatId = {
      isDeleted: false,
      vCatId: getCatId.vBusinessCatId,
    };
    let getSubCatId = await dbService.findAllRecords(
      "BusinessSubCatModel",
      filtersubCatId,
      {
        _id: 1,
        vName: 1,
      },
      {
        iNumber: 1,
        _id: 1,
      }
    );
    // if (getSubCatId.length == 0) throw new Error(Message.recordNotFound);

    let newArr = [];
    for (const element of getSubCatId) {
      let filter = {
        isDeleted: false,
        isTime: false,
        vLanguageId: new ObjectId(vLanguageId),
        vCatId: new ObjectId(element._id),
      };

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
            dtDate: 1,
            dtCreatedAt: 1,
            isPremium: 1,
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

      let dataList = await dbService.aggregateData(
        "BusinessCatPostModel",
        aggregateQuery
      );

      console.log("dataList------>", dataList);
      if (!dataList) throw new Error(Message.systemError);

      if (dataList.length != 0) {
        let newobject = {
          _id: element._id,
          vName: element.vName,
          dataList: dataList,
        };

        newArr.push(newobject);
      }
    }
    return { data: newArr };
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = allCatDataList;
