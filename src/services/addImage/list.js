const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const listCat = async (entry) => {
  try {
    let {
      body: { vCatId, vTime },
    } = entry;
    let DateTime = new Date(vTime).getTime();

   
    let filter = {
      isDeleted: false,
    };

    if (vTime) {
      filter["dtCreatedAt"] = { $gte: DateTime };
    }

    if (vCatId) {
      filter["vCatId"] = new ObjectId(vCatId);
    }

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          vFrameName: 1,
          vThumbImage: 1,
          vOriginalImage: 1,
          dtCreatedAt: 1,
        },
      },
      { $sort: { _id: -1 } },
    ];

    let dataList = await dbService.aggregateData("FrameModel", aggregateQuery);

    let totalCount = await dbService.recordsCount("FrameModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = listCat;
