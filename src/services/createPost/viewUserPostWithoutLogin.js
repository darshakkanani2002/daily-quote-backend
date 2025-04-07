const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const viewUserPostWithoutLogin = async (entry) => {
  try {
    let {
      // user: { _id: UserId },
      body: { vUserId },
    } = entry;




    let filter = {
      isDeleted: false,
      vUserId: new ObjectId(vUserId)
    };

    let aggregateQuery = [
      {
        $match: filter,
      },
      // {
      //   $lookup:
      //   {
      //     from: "tblusers",
      //     localField: "_id",
      //     foreignField: "arrPostid",
      //     let: { "user": UserId },
      //     pipeline: [{ $match: { _id: new ObjectId(UserId) } },
      //     { $project: { _id: 1 } }
      //     ],
      //     as: "like"
      //   }
      // },
      {
        $project:
        {
          vUserId: 1,
          vImages: 1,
          // iLike: 1,
          // iShare: 1,
          // iDownload: 1,
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

module.exports = viewUserPostWithoutLogin;
