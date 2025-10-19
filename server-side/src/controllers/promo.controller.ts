import { Request, Response } from "express";
import mongoose from "mongoose";
import { Promo } from "../models/promo.model";
import { IPromo } from "../models/promo.interface";
import { promoCodeGenerator } from "../custom_function/promo_code_generator";

export const createPromoCode = async (req: Request, res: Response) => {
  const {
    promoName,
    type,
    limitType,
    selectedAudience,
    discount,
    quantity,
    startDate,
    endDate,
    selectedMerchandise,
  } = req.body;

  try {
    const parsedMerchandise = JSON.parse(req.body.selectedMerchandise);
    if (
      !promoName ||
      !type ||
      !limitType ||
      discount === undefined ||
      !startDate ||
      !endDate ||
      !selectedMerchandise ||
      !Array.isArray(parsedMerchandise) ||
      parsedMerchandise.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }
    const uniqueMerchandise = Array.from(
      new Map(
        parsedMerchandise.map((item) => [item._id.toString(), item])
      ).values()
    );

    const newPromoCode = new Promo({
      promo_name: promoCodeGenerator(promoName),
      type,
      limit_type: limitType,
      discount,
      start_date: startDate,
      end_date: endDate,
      selected_merchandise: uniqueMerchandise,
      selected_audience: selectedAudience,
      quantity,
    });
    await newPromoCode.save();
    res.status(200).json({ message: "Successfully created Promo Code!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error! " + error });
  }
};
