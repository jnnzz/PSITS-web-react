import mongoose, { Schema, Document, Types } from "mongoose";
import { IPromo, ISelectMerchandise } from "./promo.interface";

export interface IPromoDocument extends IPromo, Document {}

const SelectMerchandiseSchema = new Schema<ISelectMerchandise>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Merch",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const promoSchema = new Schema<IPromoDocument>({
  promo_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  limit_type: {
    type: String,
    required: true,
  },
  selected_audience: {
    type: String,
  },
  discount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  selected_merchandise: {
    type: [SelectMerchandiseSchema],
  },
});

export const Promo = mongoose.model<IPromoDocument>("Promo", promoSchema);
