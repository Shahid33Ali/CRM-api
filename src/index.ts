import express from "express";
const app = express();
import router from "./Routes/PdfController";
import mongoose from "mongoose";
import { dbChecker } from "./utils/dbChecker";
import { dbPopulator } from "./utils/dbpopulater";
import "./utils/cron-job";
import { emailGenerator } from "./email/emailGenerator";
app.use(express.json());
mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("hello there from db");
});
dbChecker().then(async (res) => {
  if (res) {
    await dbPopulator();
    await emailGenerator();
  }
});
app.use("/generate/pdf", router);
app.listen(3001, () => {
  console.log("Listening on port 3001");
});
