const { Router } = require("express");

// Start Permission Middleware//
const userAuthentication = require("../../middleware/authentication/userAuthentication");

// End Permission Middleware //

const userRouter = require("./user");
const categoryRouter = require("./category");
const frameRouter = require("./post");
const daySpacialRouter = require("./daySpacial");
const upcomingEvenetRouter = require("./upcomingEvenet");
const adsRouter = require("./ads");
const languageRouter = require("./language");
const addFontRouter = require("./addFont");
const backgroundRouter = require("./background");
const createPostRouter = require("./createPost");
const addImageRouter = require("./addImage");
const reelsRouter = require("./reels");
const homeRouter = require("./home");
const businessRouter = require("./business");
const homePostRouter = require("./homePost");
const homeCategoryRouter = require("./homeCategory");
const frameColorRouter = require("./frameColor");
const bannerRouter = require("./banner");
const businessCatRouter = require("./businessCat");
const businessSubCatRouter = require("./businessSubCat");
const businessCatPostRouter = require("./businessCatPost");
const premiumDetailsRouter = require("./premiumDetails");

const app = Router();

/*********** Combine all Routes ********************/

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/post", frameRouter);
app.use("/daySpacial", daySpacialRouter);
app.use("/ads", adsRouter);
app.use("/language", languageRouter);
app.use("/addFont", addFontRouter);
app.use("/background", backgroundRouter);
app.use("/addImage", addImageRouter);
app.use("/createPost", createPostRouter);
app.use("/home", homeRouter);
app.use("/upcomingEvent", upcomingEvenetRouter);
app.use("/reels", reelsRouter);
app.use("/business", businessRouter);
app.use("/homePost", homePostRouter);
app.use("/homeCategory", homeCategoryRouter);
app.use("/frameColor", frameColorRouter);
app.use("/banner", bannerRouter);
app.use("/businessCat", businessCatRouter);
app.use("/businessSubCat", businessSubCatRouter);
app.use("/businessCatPost", businessCatPostRouter);
app.use("/premiumDetails", premiumDetailsRouter);

module.exports = app;
