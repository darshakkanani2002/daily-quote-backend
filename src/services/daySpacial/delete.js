const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");

const deleteDaySpecial = async (antry) => {
  try {
    let {
      body: { arrDaySpecialId },
    } = antry;

    // let filter = {
    //   _id: new ObjectId(vBannerId),
    //   isDeleted: false,
    // };

    // let banner = await dbService.findOneRecord("BannerModel", filter);

    // if (!banner) throw new Error(Message.recordNotFound);

    for (const element of arrDaySpecialId) {
      let condition = {
        _id: new ObjectId(element),
        isDeleted: false,
      };
      let updateData = { isDeleted: true };
      let daySpacialDelete = await dbService.findOneAndUpdateRecord(
        "daySpacialModel",
        condition,
        updateData,
        {
          returnOriginal: false,
        }
      );

      if (!daySpacialDelete) throw new Error(Message.recordNotFound);

      fs.unlink(`public/${daySpacialDelete.vBanner}`, function (err) {
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
