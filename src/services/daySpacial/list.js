const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (antry) => {
  try {
    let {
      body: { vDaySpecialId, vLanguageId },
    } = antry;
    let filter = {
      isDeleted: false,
      vLanguageId: new ObjectId(vLanguageId),
    };

    if (vDaySpecialId) {
      filter._id = new ObjectId(vDaySpecialId);
    }

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          vImages: 1,
          vLanguageId: 1,
        },
      },
      {
        $sort: { _id: -1 },
      },
    ];

    let daySpacialList = await dbService.aggregateData(
      "daySpacialModel",
      aggregateQuery
    );
    if (!daySpacialList) throw new Error(Message.noDataAvailable);

    return daySpacialList;
  } catch (error) {
    console.error("ListError  ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
