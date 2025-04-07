const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const listCat = async (entry) => {
  try {
    let {
      body: {},
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
          vName: 1,
          vIcon: 1,
          iNumber: 1,
        },
      },
      { $sort: { iNumber: 1, _id: 1 } },
    ];

    let dataList = await dbService.aggregateData(
      "BusinessCatModel",
      aggregateQuery
    );
    let totalCount = await dbService.recordsCount("BusinessCatModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = listCat;
