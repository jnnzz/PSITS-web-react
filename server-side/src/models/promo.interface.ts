import { Types } from "mongoose";
export interface ISelectMerchandise {
  _id: Types.ObjectId;
  name: string;
}

export interface IPromo {
  promo_name: string;
  type: string;
  limit_type: string;
  selected_audience: string;
  discount: number;
  quantity: number;
  start_date: Date;
  end_date: Date;
  selected_merchandise: ISelectMerchandise[];
}
