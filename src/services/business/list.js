const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vLanguageId },
    } = entry;

    let filter = {
      isDeleted: false,
      vUserId: new ObjectId(userId),
    };

    let aggregateQuery = [
      {
        $match: filter,
      },

      {
        $lookup: {
          from: "tblbusinesscats",
          localField: "vBusinessCatId",
          foreignField: "_id",
          as: "BusinessCatName",
        },
      },
      {
        $unwind: {
          path: "$BusinessCatName",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          vName: 1,
          vBusinessCatId: 1,
          vImage: 1,
          vAddress: 1,
          vMobile: 1,
          vEmail: 1,
          vWpNumber: 1,
          vWebLink: 1,
          vSocialId: 1,
          vBusinessCatName: "$BusinessCatName.vName",
        },
      },
      { $sort: { _id: 1 } },
    ];

    let dataList = await dbService.aggregateData(
      "BusinessModel",
      aggregateQuery
    );
    let totalCount = await dbService.recordsCount("BusinessModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("list ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
