import moment from "moment";
import Campaign from "../model/CampaignModel";
import { sendEmail } from "./email";
export async function emailGenerator() {
  try {
    const now = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();
    const campaignsEndingSoon = await Campaign.find({
      endDate: { $gte: now, $lt: endOfDay },
    });
    const campaignsStartedAndUpdated = await Campaign.find({
      fetchedAt: { $gte: now },
    });
    let emailContent = "Campaigns about to end in the next 24 hours:\n\n";

    campaignsEndingSoon.forEach((campaign) => {
      emailContent += `Campaign Name: ${campaign.name}\nEnd Date: ${moment(
        campaign.endDate
      ).format("YYYY-MM-DD")}\n\n`;
    });

    emailContent += "\nLeads converted today:\n\n";
    campaignsStartedAndUpdated.forEach((campaign) => {
      campaign.leads.forEach((lead) => {
        if (lead.converted) {
          emailContent += `Lead Name: ${lead.name}, Email: ${lead.email}\n`;
        }
      });
    });
    await sendEmail(
      process.env.MY_EMAIL as string,
      "Daily Campaign & Lead Update",
      emailContent
    );
  } catch (error) {
    console.log("Ther is an error in email genreator");
  }
}
