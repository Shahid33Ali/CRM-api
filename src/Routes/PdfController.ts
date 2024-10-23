import express from "express";
import { etl, EtlData } from "../etl/etl";
import { Response, Request } from "express";
import { generatePdf } from "../pdf-builder/pdf";
const router = express.Router();

router.get("/", etl, async (req: Request, res: Response) => {
  try {
    const data: EtlData[] | undefined = req.data;
    if (!data || data.length === 0) {
      res.status(401).json({
        message: "There is no data to be shown",
      });
      return;
    }
    await generatePdf(data, res);
  } catch (error) {
    res.status(411).json({ error: "There is an error" });
  }
});
export default router;
