import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
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
    const parsedAudience = JSON.parse(req.body.selectedAudience);
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
      selected_audience: type === "Members" ? parsedAudience : [],
      selected_specific_students: type == "Students" ? parsedAudience : [],
      quantity,
    });
    await newPromoCode.save();
    res.status(200).json({ message: "Successfully created Promo Code!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error! " + error });
  }
};

export const getAllPromoCode = async (req: Request, res: Response) => {
  try {
    const promo = await Promo.find();

    if (!promo) {
      res.status(404).json({ message: "No Promo Codes" });
    }
    res.status(200).json({ promo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error! " + error });
  }
};

export const deletePromo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid promo ID" });
    }

    const promo = await Promo.findByIdAndDelete(new Types.ObjectId(id));

    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.status(200).json({ message: "Promo deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error! " + error.message });
  }
};
