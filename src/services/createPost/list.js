const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { iLimit, iPage },
    } = entry;




    // return "";
    let filter = {
      isDeleted: false,
      vUserId: new ObjectId(userId)
    };

    let aggregateQuery = [
      {
        $match: filter,
      },
      // {
      //   $lookup:
      //   {
      //     from: "tblusers",
      //     localField: "vUserId",
      //     foreignField: "_id",
      //     as: "userDetails"
      //   }
      // },
      // {
      //   $unwind:
      //   {
      //     path: "$userDetails",
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      {
        $project:
        {
          vUserId: 1,
          vImages: 1,
          vLike: 1,
          vShare: 1,
          vDownLoad: 1,
          // vName: "$userDetails.vName",
          // vMobile: "$userDetails.vMobile",
          // vProfileImage: "$userDetails.vProfileImage"
        }
      },
      { $sort: { _id: -1 } },
      { $skip: (iPage - 1) * iLimit },
      { $limit: iLimit },
    ];

    let dataList = await dbService.aggregateData("CreatePostModel", aggregateQuery);
    let totalCount = await dbService.recordsCount("CreatePostModel", filter);
    if (!dataList) throw new Error(Message.systemError);
    return { data: dataList, iCount: totalCount };



  } catch (error) {
    console.error("listDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
