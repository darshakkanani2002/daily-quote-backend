const cron = require("node-cron");
const AutoIncreasePointCronService = require("./autoPointIncrease");

//**Start cron Job */
cron.schedule("0 0 * * *", async () => {
  try {
    await performTask();
  } catch (error) {}
});

async function performTask() {
  let response = AutoIncreasePointCronService();
  response.then((res) => {
    // console.log("API Response----------------->", res);
  });
}
