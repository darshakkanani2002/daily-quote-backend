const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
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
          vTitle: 1,
          isFestival: 1,
          vFestivalImage: 1,
          vFestivalDiscount: 1,
          arrBenefits: 1,
          arrPremium: 1,
        },
      },
      { $sort: { _id: -1 } },
    ];

    let dataList = await dbService.aggregateData(
      "PremiumDetailsModel",
      aggregateQuery
    );

    return dataList;
  } catch (error) {
    console.error("list ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
