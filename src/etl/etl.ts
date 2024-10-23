import Campaign from "../model/CampaignModel";
import moment from "moment";
import { Lead } from "../model/CampaignModel";
import { Response, Request, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      data?: EtlData[];
    }
  }
}
interface EtlData {
  campaignName: string;
  startDate: Date;
  endDate: Date;
  leads: Lead[];
}
async function etl(req: Request, res: Response, next: NextFunction) {
  try {
    const dayStart = moment().startOf("day").toDate();
    const dayEnd = moment().endOf("day").toDate();
    const campaigns = await Campaign.find({
      fetchedAt: { $gte: dayStart, $lt: dayEnd },
    });
    if (campaigns.length === 0 || !campaigns) {
      req.data = [];
    } else {
      const ans: EtlData[] = campaigns.map((campaign) => ({
        campaignName: campaign.name,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        leads: campaign.leads,
      }));
      req.data = ans;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400);
  }
}
export { etl, EtlData };
