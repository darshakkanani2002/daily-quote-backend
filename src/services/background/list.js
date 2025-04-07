const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      body: { },
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
          vImage: 1
        },
      },
      { $sort: { _id: -1 } },
    ];

    let dataList = await dbService.aggregateData("BackgroundModel", aggregateQuery);

    return dataList
  } catch (error) {
    console.error("list ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
