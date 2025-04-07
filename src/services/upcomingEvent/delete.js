const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");

const deleteDaySpecial = async (antry) => {
  try {
    let {
      body: { arrEventId },
    } = antry;

    // let filter = {
    //   _id: new ObjectId(vBannerId),
    //   isDeleted: false,
    // };

    // let banner = await dbService.findOneRecord("BannerModel", filter);

    // if (!banner) throw new Error(Message.recordNotFound);

    for (const element of arrEventId) {
      let condition = {
        _id: new ObjectId(element),
        isDeleted: false,
      };
      let updateData = { isDeleted: true };
      let daySpacialDelete = await dbService.findOneAndUpdateRecord(
        "upcomingEventModel",
        condition,
        updateData,
        {
          returnOriginal: false,
        }
      );

      if (!daySpacialDelete) throw new Error(Message.recordNotFound);
    

      fs.unlink(`public/${daySpacialDelete.vImages}`, function (err) {
        //Do whatever else you need to do here
      });
    }

    return {};
  } catch (error) {
    console.error("deleteError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteDaySpecial;
