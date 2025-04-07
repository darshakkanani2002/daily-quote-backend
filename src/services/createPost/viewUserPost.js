const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const viewUserPost = async (entry) => {
  try {
    let {
      user: { _id: UserId },
      body: { vUserId, iLimit, iPage },
    } = entry;


    let filter = {
      isDeleted: false,
      vUserId: new ObjectId(vUserId)
    };

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $lookup:
        {
          from: "tblusers",
          localField: "_id",
          foreignField: "arrPostid",
          let: { "user": UserId },
          pipeline: [{ $match: { _id: new ObjectId(UserId) } },
          { $project: { _id: 1 } }
          ],
          as: "like"
        }
      },
      {
        $project:
        {
          vUserId: 1,
          vImages: 1,
          iLike: 1,
          iShare: 1,
          iDownload: 1,
          isLike: {
            $cond: {
              if: { $eq: [{ $size: '$like' }, 0] }, // Check if customerId is null
              then: false,                       // If customerId is null, set customerName to 'Guest'
              else: true        // Otherwise, use the value from the customerDetails sub-document
            }
          }
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

module.exports = viewUserPost;
