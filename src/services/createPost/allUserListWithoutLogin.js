const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const allUserListWithoutLogin = async (entry) => {
  try {
    let {
      // user: { _id: userId },
      body: { iPage, iLimit },
    } = entry;




    // return "";
    let filter = {
      isDeleted: false,

    };

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $lookup:
        {
          from: "tblusers",
          localField: "vUserId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind:
        {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      // {
      //   $lookup:
      //   {
      //     from: "tblusers",
      //     localField: "_id",
      //     foreignField: "arrPostid",
      //     let: { "user": userId },
      //     pipeline: [{ $match: { _id: new ObjectId(userId) } },
      //     { $project: { _id: 1 } }
      //     ],
      //     as: "like"
      //   }
      // },
      // {
      //   $unwind:
      //   {
      //     path: "$like",
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      {
        $project:
        {
          vUserId: 1,
          vImages: 1,
          iLike: 1,
          iShare: 1,
          iDownload: 1,
          vName: "$userDetails.vName",
          vMobile: "$userDetails.vMobile",
          vImage: "$userDetails.vImage",
          // like: "$like",
          // isLike: {
          //   $cond: {
          //     if: { $eq: [{ $size: '$like' }, 0] }, // Check if customerId is null
          //     then: false,                       // If customerId is null, set customerName to 'Guest'
          //     else: true        // Otherwise, use the value from the customerDetails sub-document
          //   }
          // }
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

module.exports = allUserListWithoutLogin;
