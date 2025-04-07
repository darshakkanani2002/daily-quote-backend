const ObjectId = require("mongodb").ObjectId;
const category = require("../../collections/category");
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const listCat = async (entry) => {
  try {
    let {
      user: { _id: vUserId },
      body: { vLanguageId, iLimit, iPage, iAppType },
    } = entry;

    if (iAppType == 1) {
      let categoryFilter = {
        isDeleted: false,
        vLanguageId: new ObjectId(vLanguageId),
        $or: [{ iAppType: 0 }, { iAppType: 1 }],
      };

      let CataggregateQuery = [
        {
          $match: categoryFilter,
        },
        { $sort: { iNumber: 1, _id: 1 } },
        {
          $project: {
            _id: 1,
            vName: 1,
            vIcon: 1,
          },
        },
      ];

      let categoryList = await dbService.aggregateData(
        "CategoryModel",
        CataggregateQuery
      );
      if (!categoryList) throw new Error(Message.systemError);

      // let upcomingEventFilter = {
      //   isDeleted: false,
      //   // vLanguageId: new ObjectId(vLanguageId),
      // };

      // let aggregateQuery = [
      //   {
      //     $match: upcomingEventFilter,
      //   },
      //   {
      //     $project: {
      //       _id: 1,
      //       vImages: 1,
      //       dtDate: 1,
      //       vLanguageId: 1,
      //       vName: 1,
      //     },
      //   },
      //   {
      //     $sort: { _id: 1 },
      //   },
      // ];

      // let upcomingEvenetList = await dbService.aggregateData(
      //   "upcomingEventModel",
      //   aggregateQuery
      // );
      // if (!upcomingEvenetList) throw new Error(Message.noDataAvailable);

      let homeCategoryFilter = {
        isDeleted: false,
        vLanguageId: new ObjectId(vLanguageId),
        $or: [{ iAppType: 0 }, { iAppType: 1 }],
      };

      let homeCataggregateQuery = [
        {
          $match: homeCategoryFilter,
        },
        {
          $project: {
            _id: 1,
            vName: 1,
            iNumber: 1,
          },
        },
        { $sort: { iNumber: 1, _id: 1 } },
      ];

      let homeCategoryList = await dbService.aggregateData(
        "homeCategoryModel",
        homeCataggregateQuery
      );
      if (!homeCategoryList) throw new Error(Message.systemError);

      let frameColorfilter = {
        isDeleted: false,
      };

      let frameColoraggregateQuery = [
        {
          $match: frameColorfilter,
        },
        {
          $project: {
            _id: 1,
            arrColorsBorder: 1,
            arrColorsFrame: 1,
          },
        },
        {
          $sort: { _id: -1 },
        },
      ];

      let frameColorList = await dbService.aggregateData(
        "FrameColorModel",
        frameColoraggregateQuery
      );
      if (!frameColorList) throw new Error(Message.noDataAvailable);

      let checkUserPremium = await dbService.findOneRecord(
        "UserModel",
        {
          _id: vUserId,
        },
        {
          isPremium: 1,
        }
      );
      if (!checkUserPremium) throw new Error(Message.recordNotFound);

      let result = {
        homeCategoryList: homeCategoryList,
        // upcomingEvenet: upcomingEvenetList,
        category: categoryList,
        frameColorList: frameColorList,
        isPremium: checkUserPremium.isPremium,
      };

      return result;
    } else {
      let Bannerfilter = {
        isDeleted: false,
        // vLanguageId: new ObjectId(vLanguageId),
      };

      let BanneraggregateQuery = [
        {
          $match: Bannerfilter,
        },
        {
          $project: {
            _id: 1,
            vBannerImg: 1,
            // vLanguageId: 1,
          },
        },
        {
          $sort: { _id: -1 },
        },
      ];

      let bannerList = await dbService.aggregateData(
        "BannerModel",
        BanneraggregateQuery
      );
      if (!bannerList) throw new Error(Message.noDataAvailable);

      let upcomingEventFilter = {
        isDeleted: false,
        // vLanguageId: new ObjectId(vLanguageId),
      };

      let aggregateQuery = [
        {
          $match: upcomingEventFilter,
        },
        {
          $project: {
            _id: 1,
            vImages: 1,
            dtDate: 1,
            vLanguageId: 1,
            vName: 1,
          },
        },
        {
          $sort: { _id: 1 },
        },
      ];

      let upcomingEvenetList = await dbService.aggregateData(
        "upcomingEventModel",
        aggregateQuery
      );
      if (!upcomingEvenetList) throw new Error(Message.noDataAvailable);

      let homeCategoryFilter = {
        isDeleted: false,
        vLanguageId: new ObjectId(vLanguageId),
        $or: [{ iAppType: 0 }, { iAppType: 2 }],
      };

      let homeCataggregateQuery = [
        {
          $match: homeCategoryFilter,
        },
        {
          $project: {
            _id: 1,
            vName: 1,
            iNumber: 1,
          },
        },
        { $sort: { iNumber: 1, _id: 1 } },
      ];

      let homeCategoryList = await dbService.aggregateData(
        "homeCategoryModel",
        homeCataggregateQuery
      );
      if (!homeCategoryList) throw new Error(Message.systemError);

      let arrHomePost = [];

      if (homeCategoryList.length != 0) {
        for (const element of homeCategoryList) {
          let filter = {
            isDeleted: false,
            isTime: false,
            vLanguageId: new ObjectId(vLanguageId),
            vCatId: element._id,
          };

          let aggregateQuery = [
            {
              $match: filter,
            },

            {
              $lookup: {
                from: "tblusers",
                localField: "_id",
                foreignField: "arrPostid",
                let: { user: vUserId },
                pipeline: [
                  { $match: { _id: new ObjectId(vUserId) } },
                  { $project: { _id: 1 } },
                ],
                as: "like",
              },
            },

            {
              $lookup: {
                from: "tblusers",
                localField: "_id",
                foreignField: "arrBPostid",
                let: { user: vUserId },
                pipeline: [
                  { $match: { _id: new ObjectId(vUserId) } },
                  { $project: { _id: 1 } },
                ],
                as: "Blike",
              },
            },

            {
              $project: {
                _id: 1,
                vImageName: 1,
                vImages: 1,
                vLanguageId: 1,
                vBPostId: { $ifNull: ["$vBPostId", ""] },
                dtCreatedAt: 1,
                dtDate: 1,
                isPremium: 1,
                iDownload: { $ifNull: ["$iDownload", 0] },
                iShare: { $ifNull: ["$iShare", 0] },
                iLike: { $ifNull: ["$iLike", 0] },
                iBDownload: { $ifNull: ["$iBDownload", 0] },
                iBShare: { $ifNull: ["$iBShare", 0] },
                iBLike: { $ifNull: ["$iBLike", 0] },
                isLike: {
                  $cond: {
                    if: { $eq: [{ $size: "$like" }, 0] },
                    then: false,
                    else: true,
                  },
                },
                isBLike: {
                  $cond: {
                    if: { $eq: [{ $size: "$Blike" }, 0] },
                    then: false,
                    else: true,
                  },
                },
              },
            },
            { $sort: { _id: -1 } },
            { $skip: (iPage - 1) * iLimit },
            { $limit: iLimit },
          ];

          const withLogin = await dbService.aggregateData(
            "HomePostModel",
            aggregateQuery
          );
          if (!withLogin) throw new Error(Message.systemError);

          if (withLogin.length != 0) {
            let newobject = {
              _id: element._id,
              vName: element.vName,
              postList: withLogin,
            };

            arrHomePost.push(newobject);
          }
        }
      }

      let categoryFilter = {
        isDeleted: false,
        vLanguageId: new ObjectId(vLanguageId),
        $or: [{ iAppType: 0 }, { iAppType: 2 }],
      };

      let CataggregateQuery = [
        {
          $match: categoryFilter,
        },
        { $sort: { iNumber: 1, _id: 1 } },
        {
          $project: {
            _id: 1,
            vName: 1,
            vIcon: 1,
            // iNumber: 1,
          },
        },
      ];

      let categoryList = await dbService.aggregateData(
        "CategoryModel",
        CataggregateQuery
      );
      if (!categoryList) throw new Error(Message.systemError);

      let arrCatWisePost = [];

      if (categoryList.length != 0) {
        for (const element of categoryList) {
          let filter = {
            isDeleted: false,
            isTime: false,
            vCatId: new ObjectId(element._id),
          };

          let aggregateQuery = [
            {
              $match: filter,
            },

            {
              $lookup: {
                from: "tblusers",
                localField: "_id",
                foreignField: "arrPostid",
                let: { user: vUserId },
                pipeline: [
                  { $match: { _id: new ObjectId(vUserId) } },
                  { $project: { _id: 1 } },
                ],
                as: "like",
              },
            },

            {
              $lookup: {
                from: "tblusers",
                localField: "_id",
                foreignField: "arrBPostid",
                let: { user: vUserId },
                pipeline: [
                  { $match: { _id: new ObjectId(vUserId) } },
                  { $project: { _id: 1 } },
                ],
                as: "Blike",
              },
            },

            {
              $project: {
                _id: 1,
                vImageName: 1,
                vImages: 1,
                vLanguageId: 1,
                vBPostId: { $ifNull: ["$vBPostId", ""] },
                isPremium: 1,
                dtCreatedAt: 1,
                iDownload: { $ifNull: ["$iDownload", 0] },
                iShare: { $ifNull: ["$iShare", 0] },
                iLike: { $ifNull: ["$iLike", 0] },
                iBDownload: { $ifNull: ["$iBDownload", 0] },
                iBShare: { $ifNull: ["$iBShare", 0] },
                iBLike: { $ifNull: ["$iBLike", 0] },
                isLike: {
                  $cond: {
                    if: { $eq: [{ $size: "$like" }, 0] },
                    then: false,
                    else: true,
                  },
                },
                isBLike: {
                  $cond: {
                    if: { $eq: [{ $size: "$Blike" }, 0] },
                    then: false,
                    else: true,
                  },
                },
              },
            },
            { $sort: { _id: -1 } },
            { $skip: (iPage - 1) * iLimit },
            { $limit: iLimit },
          ];

          let withLoginPost = await dbService.aggregateData(
            "PostModel",
            aggregateQuery
          );
          if (!withLoginPost) throw new Error(Message.systemError);

          if (withLoginPost.length > 0) {
            let newobject = {
              _id: element._id,
              vName: element.vName,
              postList: withLoginPost,
            };
            arrCatWisePost.push(newobject);
          }
        }
      }

      let frameColorfilter = {
        isDeleted: false,
      };

      let frameColoraggregateQuery = [
        {
          $match: frameColorfilter,
        },
        {
          $project: {
            _id: 1,
            arrColorsBorder: 1,
            arrColorsFrame: 1,
          },
        },
        {
          $sort: { _id: -1 },
        },
      ];

      let frameColorList = await dbService.aggregateData(
        "FrameColorModel",
        frameColoraggregateQuery
      );
      if (!frameColorList) throw new Error(Message.noDataAvailable);

      let checkUserPremium = await dbService.findOneRecord(
        "UserModel",
        {
          _id: vUserId,
        },
        {
          isPremium: 1,
        }
      );
      if (!checkUserPremium) throw new Error(Message.recordNotFound);

      let result = {
        bannerList: bannerList,
        upcomingEvenet: upcomingEvenetList,
        arrHomePost: arrHomePost,
        category: categoryList,
        arrCatWisePost: arrCatWisePost,
        frameColorList: frameColorList,
        isPremium: checkUserPremium.isPremium,
      };

      return result;
    }
  } catch (error) {
    console.error("lis ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = listCat;
