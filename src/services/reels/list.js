const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      body: { vReelsId, iPage, iLimit },
    } = entry;

    let filter = {
      isDeleted: false,
    };

    if (vReelsId) {
      filter["vReelsId"] = new ObjectId(vReelsId);
    }

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          vReels: 1,
        },
      },

      { $sort: { _id: -1 } },

      { $skip: (iPage - 1) * iLimit },
      { $limit: iLimit },
    ];

    let dataList = await dbService.aggregateData("ReelsModel", aggregateQuery);
    if (!dataList) throw new Error(Message.systemError);

    let totalCount = await dbService.recordsCount("ReelsModel", filter);

    return { data: dataList, iCount: totalCount };

    return dataList;
  } catch (error) {
    console.error("list ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
