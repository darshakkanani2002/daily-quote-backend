const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vTitle,
        isFestival,
        vFestivalImage,
        vFestivalDiscount,
        arrBenefits,
        arrPremium,
      },
      file,
    } = entry;

    console.log("file------------------->", file);
    console.log("arrBenefits------------------->", arrBenefits);
    console.log("arrPremium------------------->", arrPremium);

    if (file.filename && Object.keys(file).length > 0) {
      let images = "premiumDetails/" + file.filename;
      console.log("iner---------->", images);
    }

    // return file;

    let checkData = await dbService.findOneRecord(
      "PremiumDetailsModel",
      { vTitle: vTitle },
      {
        _id: 1,
      }
    );
    if (!checkData) {
      if (file.filename && Object.keys(file).length > 0) {
        let images = "premiumDetails/" + file.filename;
        console.log("iner---------->", images);

        let saveData = await dbService.createOneRecord("PremiumDetailsModel", {
          vTitle,
          isFestival,
          vFestivalImage: images,
          vFestivalDiscount,
          arrBenefits,
          arrPremium,
        });
        if (!saveData) throw new Error(Message.systemError);

        return saveData;
      } else {
        let saveData = await dbService.createOneRecord("PremiumDetailsModel", {
          vTitle,
          isFestival,
          vFestivalDiscount,
          arrBenefits,
          arrPremium,
        });
        if (!saveData) throw new Error(Message.systemError);

        return saveData;
      }
    }
  } catch (error) {
    console.error("saveDrCat ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
