const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");

const deleteBanner = async (antry) => {
  try {
    let {
      body: { vBannerId },
    } = antry;

    let filter = {
      _id: new ObjectId(vBannerId),
      isDeleted: false,
    };

    let banner = await dbService.findOneRecord("BannerModel", filter);

    if (!banner) throw new Error(Message.recordNotFound);

    let condition = {
      _id: new ObjectId(vBannerId),
      isDeleted: false,
    };

    let updateData = { isDeleted: true };

    // if (vArrPosition) {
    //   let bannerarr = banner.arrBannerImg;

    //   let newArrBanner = bannerarr.splice(vArrPosition, 1);

    //   updateData["arrBannerImg"] = newArrBanner;
    // } else {
    //   updateData["isDeleted"] = true;
    // }

    let bannerDelete = await dbService.findOneAndUpdateRecord(
      "BannerModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!bannerDelete) throw new Error(Message.recordNotFound);
    fs.unlink(`public/${bannerDelete.vBannerImg}`, function (err) {
      //Do whatever else you need to do here
    });
    return bannerDelete;
  } catch (error) {
    console.error("deleteBannerError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteBanner;
