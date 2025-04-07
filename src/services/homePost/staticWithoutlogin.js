const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const staticWithoutLoginData = async (antry) => {
  try {
    let {
      user: { _id: userId },
      body: { vPostId, iDownload, iShare, iLike, iBDownload, iBShare, iBLike },
    } = antry;



    let filter = {
      _id: new ObjectId(vPostId),
      isDeleted: false,
    };

    let FrameCheck = await dbService.findOneRecord("HomePostModel", filter, {
      _id: 1,
      iDownload: 1,
      iShare: 1,
      iLike: 1,
      iBDownload: 1,
      iBShare: 1,
      iBLike: 1,
    });

    if (!FrameCheck) throw new Error(Message.recordNotFound);

    let condition = {
      _id: new ObjectId(vPostId),
    };

    let updateData = {
      dtUpdatedAt: Date.now(),
      isUpdated: true,
    };

    if (iDownload) {
      let Download = Number(FrameCheck.iDownload) + 1;
      updateData["iDownload"] = Download;
    }
    if (iShare) {
      let Download = Number(FrameCheck.iShare) + 1;
      updateData["iShare"] = Download;
    }
    if (iLike) {
      let like = Number(FrameCheck.iLike) + 1;
      updateData["iLike"] = like;
    } else {
      if (FrameCheck.iLike >= 1) {
        let like = Number(FrameCheck.iLike) - 1;
        updateData["iLike"] = like;
      }
    }

    if (iBDownload) {
      let BDownload = Number(FrameCheck.iBDownload) + 1;
      updateData["iBDownload"] = BDownload;
    }
    if (iBShare) {
      let BSahre = Number(FrameCheck.iBShare) + 1;
      updateData["iBShare"] = BSahre;
    }
    if (iBLike) {
      let like = Number(FrameCheck.iBLike) + 1;
      updateData["iLike"] = like;
    } else {
      if (FrameCheck.iBLike >= 1) {
        let like = Number(FrameCheck.iBLike) - 1;
        updateData["iBLike"] = like;
      }
    }
    // if (iLike == false) {
    //   if (FrameCheck.iLike >= 1) {
    //     let like = Number(FrameCheck.iLike) - 1;
    //     updateData["iLike"] = like;

    //     updateData["iLike"] = like;
    //   }
    // }

    let updateStatic = await dbService.findOneAndUpdateRecord(
      "HomePostModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!updateStatic) throw new Error(Message.systemError);
    return updateStatic;
  } catch (error) {
    console.error("steticWithoutLoginError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = staticWithoutLoginData;
