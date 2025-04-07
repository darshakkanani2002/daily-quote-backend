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
          dtDate: 1,
          vLanguageId: 1,
          vName: 1,
        },
      },
      {
        $sort: { dtDate: -1 },
      },
    ];

    let daySpacialList = await dbService.aggregateData(
      "upcomingEventModel",
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
