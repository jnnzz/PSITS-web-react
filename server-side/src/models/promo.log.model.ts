import mongoose, { Schema, Document, Types } from "mongoose";
import { IPromoLog } from "./promo.log.interface";

export interface IPromoLogDocument extends IPromoLog, Document {}

const promoLogSchema = new Schema<IPromoLogDocument>({
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const PromoLog = mongoose.model<IPromoLogDocument>(
  "PromoLog",
  promoLogSchema
);
