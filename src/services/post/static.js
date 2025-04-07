const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const fs = require("fs");
const staticData = async (antry) => {
  try {
    let {
      user: { _id: userId },
      body: { vPostId, iDownload, iShare, iLike, iBDownload, iBShare, iBLike },
    } = antry;

    

    let filter = {
      _id: new ObjectId(vPostId),
      isDeleted: false,
    };

    let FrameCheck = await dbService.findOneRecord("PostModel", filter, {
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
      let Share = Number(FrameCheck.iShare) + 1;
      updateData["iShare"] = Share;
    }
    if (iLike == "T") {
      let like = Number(FrameCheck.iLike) + 1;
      updateData["iLike"] = like;

      let condition1 = {
        _id: new ObjectId(userId),
      };

      let updateData1 = {
        $push: { arrPostid: vPostId },
      };
      let likedata = await dbService.findOneAndUpdateRecord(
        "UserModel",
        condition1,
        updateData1
      );
      if (!likedata) throw new Error(Message.systemError);
    }

    if (iLike == "F") {
      if (FrameCheck.iLike >= 1) {
        let like = Number(FrameCheck.iLike) - 1;
        updateData["iLike"] = like;

        updateData["iLike"] = like;

        let condition2 = {
          _id: new ObjectId(userId),
        };

        let updateData2 = {
          $pull: { arrPostid: vPostId },
        };
        let likedata = await dbService.findOneAndUpdateRecord(
          "UserModel",
          condition2,
          updateData2
        );
        if (!likedata) throw new Error(Message.systemError);
      }
    }

    // if (iLike == false) {
    //   if (FrameCheck.iLike >= 1) {
    //     let like = Number(FrameCheck.iLike) - 1;
    //     updateData["iLike"] = like;

    //     updateData["iLike"] = like;

    //     let condition2 = {
    //       _id: new ObjectId(userId),
    //     };

    //     let updateData2 = {
    //       $pull: { arrPostid: vPostId },
    //     };
    //     let likedata = await dbService.findOneAndUpdateRecord(
    //       "UserModel",
    //       condition2,
    //       updateData2
    //     );
    //     if (!likedata) throw new Error(Message.systemError);
    //   }
    // }

    if (iBDownload) {
      let BDownload = Number(FrameCheck.iBDownload) + 1;
      updateData["iBDownload"] = BDownload;
    }
    if (iBShare) {
      let BShare = Number(FrameCheck.iBShare) + 1;
      updateData["iBShare"] = BShare;
    }
    if (iBLike == "T") {
      let Blike = Number(FrameCheck.iBLike) + 1;
      updateData["iBLike"] = Blike;

      let condition1 = {
        _id: new ObjectId(userId),
      };

      let updateData1 = {
        $push: { arrBPostid: vPostId },
      };
      let likedata = await dbService.findOneAndUpdateRecord(
        "UserModel",
        condition1,
        updateData1
      );
      if (!likedata) throw new Error(Message.systemError);
    }

    if (iBLike == "F") {
      if (FrameCheck.iBLike >= 1) {
        let Blike = Number(FrameCheck.iBLike) - 1;
        updateData["iBLike"] = Blike;

        updateData["iBLike"] = Blike;

        let condition2 = {
          _id: new ObjectId(userId),
        };

        let updateData2 = {
          $pull: { arrBPostid: vPostId },
        };
        let likedata = await dbService.findOneAndUpdateRecord(
          "UserModel",
          condition2,
          updateData2
        );
        if (!likedata) throw new Error(Message.systemError);
      }
    }
    // if (iBLike == false) {
    //   if (FrameCheck.iBLike >= 1) {
    //     let Blike = Number(FrameCheck.iBLike) - 1;
    //     updateData["iBLike"] = Blike;

    //     updateData["iBLike"] = Blike;

    //     let condition2 = {
    //       _id: new ObjectId(userId),
    //     };

    //     let updateData2 = {
    //       $pull: { arrBPostid: vPostId },
    //     };
    //     let likedata = await dbService.findOneAndUpdateRecord(
    //       "UserModel",
    //       condition2,
    //       updateData2
    //     );
    //     if (!likedata) throw new Error(Message.systemError);
    //   }
    // }

    let updateStatic = await dbService.findOneAndUpdateRecord(
      "PostModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );

    if (!updateStatic) throw new Error(Message.systemError);
    return updateStatic;
  } catch (error) {
    console.error("static ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = staticData;
