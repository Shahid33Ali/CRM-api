import PDFDocument from "pdfkit";
import { Response } from "express";
import { EtlData } from "../etl/etl";
export const generatePdf = async (data: EtlData[], res: Response) => {
  try {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=campaigns_leads.pdf"
    );
    doc.pipe(res);
    doc
      .fontSize(25)
      .text("All todays new and updates Campaigns", { underline: true });
    data.forEach((campaign) => {
      doc.addPage();
      doc.fontSize(20).text(`Campaign: ${campaign.campaignName}`);
      doc.text(`Start Date: ${campaign.startDate}`);
      doc.text(`End Date: ${campaign.endDate}`);
      campaign.leads.forEach((lead) => {
        if (lead.converted) {
          doc.text(`Converted Lead: ${lead.name}, Email: ${lead.email}`);
        } else {
          doc.text(
            `Not Converted Yet Lead: ${lead.name}, Email: ${lead.email}`
          );
        }
      });
    });
    doc.end();
  } catch (error) {
    res.status(500).json({
      message: "There is an error while generating Pdf",
    });
  }
};
