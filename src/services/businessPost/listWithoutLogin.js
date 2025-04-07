const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const withoutLoginlist = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vCatId, vLanguageId, iPage, iLimit },
    } = entry;

    let filter = {
      isDeleted: false,
      isTime: false,
      vLanguageId: new ObjectId(vLanguageId),
      vCatId: new ObjectId(vCatId),
    };

    let aggregateQuery = [
      {
        $match: filter,
      },

      {
        $project: {
          _id: 1,
          vImageName: 1,
          vImages: 1,
          vLanguageId: 1,
          dtDate: 1,
          isPremium: 1,
          isTime: 1,
          isTrending: 1,
          vCatId: 1,
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

    let totalCount = await dbService.recordsCount(
      "BusinessCatPostModel",
      filter
    );
    if (!dataList) throw new Error(Message.systemError);
    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = withoutLoginlist;
