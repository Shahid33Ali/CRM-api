import axios from "axios";
import Campaign, { Campaign as CampaignType } from "../model/CampaignModel";

export async function dbPopulator() {
  try {
    const response = await axios.get(process.env.API_END_POINT as string);
    const rawdata: CampaignType[] = response.data;

    for (const campaign of rawdata) {
      try {
        const existingCampaign = await Campaign.findOne({
          name: campaign.name,
        });

        if (!existingCampaign) {
          const newCampaign = new Campaign(campaign);
          await newCampaign.save();
        } else {
          existingCampaign.leads = campaign.leads;
          existingCampaign.fetchedAt = new Date();
          await existingCampaign.save();
        }
      } catch (dbError) {
        console.error(`Error processing campaign ${campaign.name}:`, dbError);
      }
    }
    console.log("db populated");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
