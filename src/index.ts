import express from "express";
const app = express();
import router from "./Routes/PdfController";
import mongoose from "mongoose";
import { dbChecker } from "./utils/dbChecker";
import { dbPopulator } from "./utils/dbpopulater";
import "./utils/cron-job";
import { emailGenerator } from "./email/emailGenerator";
import "dotenv/config";
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("hello there from db");
  })
  .catch((err) => {
    console.log(err);
  });
dbChecker().then(async (res) => {
  if (!res) {
    await dbPopulator();
    console.log(process.env.MY_PASSWORD);
    await emailGenerator();
  }
});
app.use("/generate/pdf", router);
app.listen(3001, () => {
  console.log("Listening on port 3001");
});
