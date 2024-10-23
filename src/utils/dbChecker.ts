import moment from "moment";
import Campaign from "../model/CampaignModel";

export async function dbChecker() {
  const campaigns = await Campaign.find().sort({ fetchedAt: -1 });
  if (campaigns.length === 0) {
    return false;
  }
  const latest = campaigns[0];
  if (latest.fetchedAt < moment().startOf("day").toDate()) {
    return false;
  } else {
    return true;
  }
}
