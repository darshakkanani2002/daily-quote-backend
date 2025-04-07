const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      body: { vLanguageId },
    } = entry;

    let filter = {
      isDeleted: false,
    };

    if (vLanguageId) {
      filter["vLanguageId"] = new ObjectId(vLanguageId);
    }

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          vName: 1,
          vCode: 1,
        },
      },
      { $sort: { _id: 1 } },
    ];

    let dataList = await dbService.aggregateData(
      "LanguageModel",
      aggregateQuery
    );
    let totalCount = await dbService.recordsCount("LanguageModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
