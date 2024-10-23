import mongoose, { Schema, Document } from "mongoose";
export interface Campaign extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  leads: Lead[];
  fetchedAt: Date;
}
export interface Lead extends Document {
  name: string;
  email: string;
  converted: boolean;
}
const LeadSchema: Schema<Lead> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please Enter Valid Email"],
  },
  converted: {
    type: Boolean,
    default: false,
  },
});
const CampaignSchema: Schema<Campaign> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leads: {
    type: [LeadSchema],
    required: true,
  },

  fetchedAt: {
    type: Date,
    default: Date.now,
  },
});
const Campaign = mongoose.model<Campaign & Document>(
  "Campaign",
  CampaignSchema
);
export default Campaign;
