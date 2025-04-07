const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (antry) => {
  try {
    let {
      body: {},
    } = antry;
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
          arrColorsBorder: 1,
          arrColorsFrame: 1,
        },
      },
      {
        $sort: { _id: -1 },
      },
    ];

    let frameColorList = await dbService.aggregateData(
      "FrameColorModel",
      aggregateQuery
    );
    if (!frameColorList) throw new Error(Message.noDataAvailable);

    return frameColorList;
  } catch (error) {
    console.error("ListError  ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
