const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const viewUser = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {},
    } = entry;

    let filter = {
      isDeleted: false,
      _id: new ObjectId(userId),
    };

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          arrPostid: 0,
          arrBPostid: 0,
          isDeleted: 0,
          dtCreatedAt: 0,
        },
      },
      {
        $sort: { _id: -1 },
      },
    ];

    let userlist = await dbService.aggregateData("UserModel", aggregateQuery);
    if (!userlist) throw new Error(Message.noDataAvailable);

    return userlist;
  } catch (error) {
    console.error("viewUser  ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = viewUser;
