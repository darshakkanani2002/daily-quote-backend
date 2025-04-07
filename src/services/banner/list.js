const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const ObjectId = require("mongodb").ObjectId;

const list = async (antry) => {
  try {
    let {
      body: { vBannerId },
    } = antry;
    let filter = {
      isDeleted: false,
    };

    if (vBannerId) {
      filter._id = new ObjectId(vBannerId);
    }

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          vBannerImg: 1,
          vImageName: 1,
        },
      },
      {
        $sort: { _id: -1 },
      },
    ];

    let businessList = await dbService.aggregateData(
      "BannerModel",
      aggregateQuery
    );
    if (!businessList) throw new Error(Message.noDataAvailable);

    let businessCount = await dbService.recordsCount("BannerModel", filter);
    return { data: businessList, iCount: businessCount };
  } catch (error) {
    console.error("viewBannerError  ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
