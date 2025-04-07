const mongoose = require("mongoose");

/* development connection string */
const databaseUrl = process.env.ATLAS_URL;
console.log("DB URL:", databaseUrl);

// Mongoose setup with server
// mongoose.set("strictQuery", false);

mongoose.connect(
  databaseUrl,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
    } else {
      console.log("database connected", new Date());
    }
  }
);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  console.error(`🚫 Error → : ${err.message}`);
});

module.exports = mongoose;
