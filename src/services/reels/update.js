const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const update = async (antry) => {
  try {


    let {
      body: { vFrameId, vFrameName, vStartColor, vEndColor, vTextColor },
  
    } = antry;

    let filter = {
      _id: new ObjectId(vFrameId),
    };

    let FrameCheck = await dbService.findOneRecord("FrameModel", filter, {
      _id: 1,
    
    });

    if (!FrameCheck) throw new Error(Message.noDataAvailable);

 

    let condition = {
      _id: new ObjectId(vFrameId),
    };

    let updateData = {
      vTextColor,
      vEndColor,
      vStartColor,
      vFrameName,
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };
    let addbBanner = await dbService.findOneAndUpdateRecord(
      "FrameModel",
      condition,
      updateData
    );


    if (!addbBanner) throw new Error(Message.systemError);
    return addbBanner;
  } catch (error) {
    console.error("updateBannerError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
