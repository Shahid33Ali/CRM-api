import axios from "axios";
import Campaign, { Campaign as CampaignType } from "../model/CampaignModel";

export async function dbPopulator() {
  try {
    const response = await axios.get("http://localhost:5000/api/campaigns"); // Replace with your actual API URL
    const rawdata: CampaignType[] = response.data;

    for (const campaign of rawdata) {
      try {
        const existingCampaign = await Campaign.findOne({
          name: campaign.name,
        });

        if (!existingCampaign) {
          const newCampaign = new Campaign(campaign); // Use the campaign data directly
          await newCampaign.save();
        } else {
          existingCampaign.leads = campaign.leads; // Update leads
          await existingCampaign.save(); // Save the updated campaign
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