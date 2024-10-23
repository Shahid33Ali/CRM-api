import cron from "node-cron";
import { dbPopulator } from "./dbpopulater";
import { emailGenerator } from "../email/emailGenerator";
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Runnung daily data fetching and email job");
    await dbPopulator();
    await emailGenerator();
  } catch (err) {
    console.log("Error in cron job");
  }
});
export default {};
