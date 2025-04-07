const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const listFont = async (entry) => {
  try {
    let {
      body: { vFontId },
    } = entry;



    
    
    // return "";
    let filter = {
      isDeleted: false,
    };

    if (vFontId) {
      vFontId["filter"] = vFontId
    }


    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          vFontUrl: 1
        },
      },
      { $sort: { _id: -1 } },
    ];

    let dataList = await dbService.aggregateData("FontModel", aggregateQuery);

    return dataList;
  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = listFont;
